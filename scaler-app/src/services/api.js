import axios from "axios";

const apiGateway = axios.create({
    baseURL: 'http://localhost:8090'
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
