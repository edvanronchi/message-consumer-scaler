import docker
import service
from flask import Flask, jsonify, request, Blueprint, make_response

api_blueprint = Blueprint('api', __name__, url_prefix='/api/v1')


@api_blueprint.route('/health', methods=['GET'])
def main():
    return jsonify({'status': 'UP'})


@api_blueprint.route('/up-docker-compose', methods=['POST'])
def up_docker_compose():
    payload = request.json

    deploy = {
        'cpus': payload['cpus'] or '0.5',
        'memory': payload['memory'] or '256M',
        'replicas': payload['replicas'] or 1,
    }

    file_docker_compose = service.create_file_docker_compose(deploy)
    file_id = file_docker_compose['file_id']
    command_up_docker_compose = service.get_command_up_docker_compose(file_id)

    command_executed = service.command(command_up_docker_compose)

    if command_executed['status'] == 'error':
        return command_executed

    return {
        'status': 'success',
        'file_id': file_id
    }


@api_blueprint.route('/remove-docker-container/<container_id>', methods=['DELETE'])
def remove_docker_container(container_id):
    command_remove_docker_container = service.get_command_remove_docker_container(container_id)
    command_executed = service.command(command_remove_docker_container)

    if command_executed['status'] == 'error':
        return command_executed

    return make_response('', 204)


@api_blueprint.route('/containers', methods=['GET'])
def docker_ps():
    client = docker.from_env()

    containers = client.containers.list()

    containers_info = []
    for container in containers:
        containers_info.append({
            'container_name': container.name,
            'file_id': service.get_container_file_id(container.name),
            'sequence': service.get_container_sequence(container.name),
            'status': container.status,
        })

    return make_response(containers_info, 200)


app = Flask(__name__)
app.register_blueprint(api_blueprint)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
