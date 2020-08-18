import {
    SAVE_SETTINGS,
    GET_SETTINGS,
    UPDATE_SETTINGS
} from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case SAVE_SETTINGS:
            return { ...state, savedSettings: action.payload }
        case GET_SETTINGS:
            return { ...state, getSettings: action.payload }
        case UPDATE_SETTINGS:
            return { ...state, updatedSettings: action.payload }
        default:
            return state;
    };
};