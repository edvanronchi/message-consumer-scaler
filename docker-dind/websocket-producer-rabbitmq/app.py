import asyncio
import requests
import socketio

sio = socketio.AsyncClient()

url_prometheus = 'http://prometheus:9090/api/v1/query'
url_websocket_server = 'http://websocket-server:4000'

queries_prometheus = {
    'total_consumers': 'rabbitmq_consumers{instance="rabbitmq:15692", job="rabbitmq"}',
    'total_messages': 'rabbitmq_queue_messages_ready{instance="rabbitmq:15692", job="rabbitmq"}',
    'messages_per_second': 'sum(rate(rabbitmq_global_messages_received_total[5s]) * on (instance) group_left ('
                           'rabbitmq_cluster) rabbitmq_identity_info{instance="rabbitmq:15692",job="rabbitmq"})'
}


def get_metrics():
    metrics = {}
    for key, query in queries_prometheus.items():
        params = {'query': query}
        response = requests.get(url_prometheus, params=params)

        if response.status_code != 200:
            metrics[key] = '-'
            continue

        json = response.json()
        metrics[key] = json['data']['result'][0]['value'][1]

    return metrics


async def send_message_metric_socket():
    while True:
        await asyncio.sleep(1)
        metrics = get_metrics()
        print(metrics)
        await sio.emit('metric-socket', metrics)
        print('Message sent to metric-socket')


@sio.event
async def connect():
    print('Connection established')
    await asyncio.create_task(send_message_metric_socket())


@sio.event
async def disconnect():
    print('Disconnected from server')


async def main():
    await sio.connect(url_websocket_server)
    await sio.wait()


if __name__ == '__main__':
    asyncio.run(main())
