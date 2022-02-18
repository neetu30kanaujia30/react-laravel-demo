import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {requestsPromiseMiddleware} from "redux-saga-requests";
import thunkMiddleware from 'redux-thunk';
import saga from './saga';
import auth from './auth/reducer';
import notification from './notification/reducer';
import notifications from './notifications/reducer';
import users from './users/reducer';
import profile from './profile/reducer';
const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middlewares = [
    thunkMiddleware,
    requestsPromiseMiddleware({auto: true}),
    sagaMiddleware,
];
const rootReducer = combineReducers({
    auth,
    notification,
    notifications,
    users,
    profile
});
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
sagaMiddleware.run(() => saga(store.dispatch, store.getState));
export default store;
