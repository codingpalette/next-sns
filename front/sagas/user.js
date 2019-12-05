import { all, fork , takeLatest , call , put} from 'redux-saga/effects'
import { LOG_IN , LOG_IN_SUCCESS , LOG_IN_FAILURE } from '../reducers/user';

function loginAPI() {
    // 서버에 요청을 보냄
}

function* login() {
    try{
        yield call(loginAPI);
        yield put({
            type : LOG_IN_SUCCESS
        })
    } catch(e) {
        console.error(e);
        yield put({
            type : LOG_IN_FAILURE
        })
    } finally {

    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN, login)
}


export default function* userSaga() {
    yield all([
        fork(watchLogin),
    ]);
};