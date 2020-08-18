import axios from 'axios';
import {
    SAVE_SETTINGS,
    GET_SETTINGS,
    UPDATE_SETTINGS
} from './types';
import {SETTINGS_SERVER} from '../components/Config.js';

export function saveSettings(dataToSubmit){
    const request = axios.post(`${SETTINGS_SERVER}/saveSettings`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: SAVE_SETTINGS,
        payload: request
    }
}

export function updateSettings(dataToSubmit, id) {
    const request = axios.put(`${SETTINGS_SERVER}/updateSettings/${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_SETTINGS,
        payload: request
    }
}

export function getSettings(dataToSubmit) {
    const request = axios.post(`${SETTINGS_SERVER}/getSettings`, dataToSubmit)
        .then(response => response.data);

    return {
        type: GET_SETTINGS,
        payload: request
    }
}