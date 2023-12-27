import subprocess
import yaml
import uuid
import requests
import os
import json

url_mongodb_consumer_api = os.environ.get('URL_MONGODB_CONSUMER_API', 'http://localhost:8091')


def command(cmd: str):
    try:
        subprocess.Popen(cmd, shell=True)
        return message_success('Success executing command')
    except subprocess.CalledProcessError as e:
        return message_error('Error executing command: {0}'.format(e.output.decode()))


def save_to_mongo(file_id: str, deploy):
    payload = json.dumps({
        'serviceName': str(file_id),
        'cpu': deploy['cpus'],
        'memory': deploy['memory'],
        'replicas': deploy['replicas'],
        'fibonacci': deploy['fibonacci']
    })

    headers = {
        'Content-Type': 'application/json'
    }

    requests.request("POST", url_mongodb_consumer_api + '/consumer', headers=headers, data=payload)


def create_file_docker_compose(deploy):
    file_id = generate_id()
    service_name = 'service-{0}'.format(str(file_id))
    network_name = 'network-{0}'.format(str(file_id))

    file = {
        'version': '3.8',
        'services': {
            service_name: {
                'build': {
                    'context': 'message-consumer-worker'
                },
                'deploy': {
                    'replicas': deploy['replicas'],
                    'resources': {
                        'limits': {
                            'cpus': deploy['cpus'],
                            'memory': deploy['memory']
                        }
                    }
                },
                'networks': [network_name],
                'environment': {
                    'FIBONACCI': deploy['fibonacci']
                }
            }
        },
        'networks': {
            network_name: {
                'driver': 'bridge'
            }
        }
    }

    return save_file_docker_compose(file, file_id)


def save_file_docker_compose(file, file_id):
    file_name = 'docker-compose-{0}.yaml'.format(file_id)
    with open(file_name, 'w') as f:
        yaml.dump(file, f, default_flow_style=False)

    return {'file_id': file_id}


def delete_file_docker_compose(file_id: str):
    os.remove('docker-compose-{0}.yaml'.format(file_id))


def message_success(message: str):
    return {'status': 'success', 'message': message}


def message_error(message: str):
    return {'status': 'error', 'message': message}


def generate_id():
    return uuid.uuid4()


def get_command_up_docker_compose(file_id: str) -> str:
    return 'docker compose -f docker-compose-{0}.yaml up'.format(file_id)


def get_command_remove_docker_container(container_id: str) -> str:
    return 'docker rm -f {0}'.format(container_id)


def get_container_file_id(container_name: str) -> str:
    return container_name[12:48]


def get_container_sequence(container_name: str) -> str:
    return container_name[49:]
