import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import indexSaga from "../sagas/index.saga";
import theme from "./theme.reducer";
import profiles from "./profiles.reducer";
import user, { userActions } from "./user.reducer";

const rootReducer = combineReducers({ theme, user, profiles });

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(indexSaga);

store.dispatch(userActions.fetchCurrentUserRequest());

export default store;
