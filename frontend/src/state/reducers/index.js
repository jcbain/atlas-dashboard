import {combineReducers} from "redux";
import tabReducer from "./tabReducer";
import themeReducer from "./themeReducer";

const reducers = combineReducers({
    tabState : tabReducer,
    themeReducer: themeReducer
});

export default reducers;