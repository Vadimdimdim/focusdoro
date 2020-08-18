import {combineReducers} from "redux";
import user from "./user_reducer";
import settings from "./settings_reducer";
import tasks from "./tasks_reducer"

const rootReducer = combineReducers({
    user,
    settings,
    tasks
});

export default rootReducer;