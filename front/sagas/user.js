import { all, fork , takeLatest , takeEvery , call , put , delay} from 'redux-saga/effects'
import { LOG_IN_REQUEST , LOG_IN_SUCCESS , LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../reducers/user';
import axios from 'axios';


function loginAPI() {
    // 서버에 요청을 보냄
};

function* login() {
    try{
        // yield call(loginAPI); 
        yield delay(2000)
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
};

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login)
};

function signUPAPI() {
    // 서버에 요청을 보냄
};

function* signUp() {
    try{
        // yield call(signUPAPI);
        yield delay(1000)
        throw new Error('에러입니다.');
        yield put({
            type : SIGN_UP_SUCCESS,
        });
    } catch(e) {
        console.error(e);
        yield put({
            type : SIGN_UP_FAILURE,
            error : e
        })
    } finally {

    }
};

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
};

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
    ]);
};