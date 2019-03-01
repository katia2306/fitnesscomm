import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import theme from "./reducers/theme.reducer";

const rootReducer = combineReducers({ theme });

export default createStore(rootReducer, composeWithDevTools());
