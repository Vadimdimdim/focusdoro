import axios from 'axios';
import {
    SAVE_TASKS,
    GET_TASKS,
    UPDATE_TASKS
} from './types';
import { TASKS_SERVER } from '../components/Config.js';

export function saveTasks(dataToSubmit) {
    const request = axios.post(`${TASKS_SERVER}/saveTasks`, dataToSubmit)
        .then(response => response.data);

    return {
        type: SAVE_TASKS,
        payload: request
    }
}

export function updateTasks(dataToSubmit, id) {
    const request = axios.put(`${TASKS_SERVER}/updateTasks/${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_TASKS,
        payload: request
    }
}

export function getTasks(dataToSubmit) {
    const request = axios.post(`${TASKS_SERVER}/getTasks`, dataToSubmit)
        .then(response => response.data);

    return {
        type: GET_TASKS,
        payload: request
    }
}