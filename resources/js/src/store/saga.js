import axios from 'axios';
import {createRequestInstance, watchRequests} from 'redux-saga-requests';
import {createDriver} from 'redux-saga-requests-axios';
import {put} from 'redux-saga/effects';
import _ from 'lodash';
import Cookies from "js-cookie";
import {logout} from './auth/actions';
function onRequestSaga(request, action) {
    const {meta} = action;
    if (!meta || !meta.withoutToken) {
        const token = Cookies.get('token');
        _.set(request, 'headers.Authorization', `Bearer ${token}`)
    }
    return request;
}
function* onErrorSaga(error) {
    const token = Cookies.get('token');
    if (error.request.status === 401 && token) {
        yield put(logout());
    }
    return {error};
}
export default function* rootSaga() {
    yield createRequestInstance({
        driver: createDriver(axios),
        onRequest: onRequestSaga,
        onError: onErrorSaga,
    });
    yield watchRequests();
}
