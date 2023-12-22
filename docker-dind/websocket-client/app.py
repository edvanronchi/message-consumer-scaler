import asyncio
import socketio
import subprocess

sio = socketio.AsyncClient()


def get_docker_stats():
    command = f"docker stats --no-stream --format 'json'"
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout


async def send_message_terminal_socket():
    while True:
        await asyncio.sleep(0.1)
        await sio.emit('terminal-socket', get_docker_stats())
        print('Message sent to terminal-socket')


async def send_message_metric_socket():
    while True:
        await asyncio.sleep(1)
        await sio.emit('metric-socket', get_docker_stats())
        print('Message sent to metric-socket')


@sio.event
async def connect():
    print('Connection established')
    await asyncio.create_task(send_message_terminal_socket())
    await asyncio.create_task(send_message_metric_socket())


@sio.event
async def disconnect():
    print('Disconnected from server')


async def main():
    await sio.connect('http://websocket-server:4000')
    await sio.wait()


if __name__ == '__main__':
    asyncio.run(main())
