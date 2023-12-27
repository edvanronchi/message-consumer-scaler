import asyncio
import socketio
import json
import subprocess
import requests
import os

sio = socketio.AsyncClient()

url_websocket_server = os.environ.get('URL_WEBSOCKET_SERVER', 'http://localhost:4000')
url_mongodb_consumer_api = os.environ.get('URL_MONGODB_CONSUMER_API', 'http://localhost:8091')

consumers = []


def get_consumer(container_name):
    if container_name == '--':
        return {}

    consumer = next((filter(lambda x: x['serviceName'] == container_name, consumers)), None)

    if consumer is not None:
        return consumer

    uri = '{0}/consumer/{1}'.format(url_mongodb_consumer_api, container_name)
    response = requests.request("GET", uri, headers={}, data={})

    if response.ok and not response.text:
        return {}

    consumer = response.json()
    consumers.append(consumer)
    return consumer


def get_processing_time(container_id):
    if container_id == '--' or container_id is None:
        return None

    uri = '{0}/consumer-processing-time/average/{1}'.format(url_mongodb_consumer_api, container_id)
    response = requests.request("GET", uri, headers={}, data={})
    average = response.json()

    if not response.ok or average == 0:
        return None

    return average


def add_fields(docker_stats):
    for container in docker_stats:
        container_name = format_container_name(container['containerName'])
        consumer = get_consumer(container_name)

        container['fibonacci'] = consumer.get('fibonacci', '-')
        container['cpu'] = consumer.get('cpu', '-')
        container['processingTime'] = get_processing_time(container['containerId'])

    return docker_stats


def format_container_name(container_name):
    if container_name == '--':
        return container_name
    return container_name[12:48]


def get_messages_per_second(terminal: list):
    total = 0
    for container in terminal:
        processing_time = container.get('processingTime', None)

        if processing_time is None:
            continue

        messages_per_second = 1000 / processing_time
        total += messages_per_second

    return total


def message_to_list(message):
    messages = [item for item in message.split('\n') if item]
    return [json.loads(m) for m in messages]


def get_docker_stats():
    command = f"docker stats --no-stream --format 'json'"
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    containers_stats = message_to_list(result.stdout)
    return [rename_fields(container_stats) for container_stats in containers_stats]


def rename_fields(container_stats):
    print(container_stats)
    return {
        'containerId': container_stats['ID'],
        'containerName': container_stats['Name'],
        'cpuPerc': container_stats['CPUPerc'],
        'memoryUsage': container_stats['MemUsage'],
        'memoryPerc': container_stats['MemPerc']
    }


async def send_message_terminal_socket():
    while True:
        await asyncio.sleep(0.1)

        docker_stats = get_docker_stats()
        terminal = add_fields(docker_stats)
        messages_per_second = get_messages_per_second(terminal)

        await sio.emit('terminal-socket', terminal)
        await sio.emit('metric-consumer-perfomance-socket', messages_per_second)

        print('Message sent')


@sio.event
async def connect():
    print('Connection established')
    await asyncio.create_task(send_message_terminal_socket())


@sio.event
async def disconnect():
    print('Disconnected from server')


async def main():
    await sio.connect(url_websocket_server)
    await sio.wait()


if __name__ == '__main__':
    asyncio.run(main())
