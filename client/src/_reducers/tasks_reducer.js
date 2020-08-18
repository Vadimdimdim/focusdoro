import {
    SAVE_TASKS, 
    GET_TASKS,
    UPDATE_TASKS
} from "../_actions/types";

export default function(state={}, action){
    switch(action.type){
        case SAVE_TASKS:
            return {...state, savedTasks: action.payload}
        case GET_TASKS:
            return {...state, getTasks: action.payload}
        case UPDATE_TASKS:
            return {...state, updatedTasks: action.payload}
        default:
            return state;
    };
};