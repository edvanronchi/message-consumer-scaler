import axios from "axios";

const URL_GATEWAY_API = 'http://localhost:8090';

const apiGateway = axios.create({
    baseURL: URL_GATEWAY_API
});

export function createConsumer(body) {
    return apiGateway.post('/docker/up-docker-compose', body);
}

export function removeConsumer(id) {
    return apiGateway.delete('/docker/remove-docker-container/' + id);
}

export function sendMessage(body) {
    return apiGateway.post('/producer/producer-message', body);
}
