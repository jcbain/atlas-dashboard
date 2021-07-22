import {combineReducers} from "redux";
import tabReducer from "./tabReducer"

const reducers = combineReducers({
    tabState : tabReducer
});

export default reducers;