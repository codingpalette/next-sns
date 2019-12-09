import { all, fork , takeLatest , takeEvery , call , put , delay} from 'redux-saga/effects'
import { LOG_IN_REQUEST , LOG_IN_SUCCESS , LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../reducers/user';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

function loginAPI(loginData) {
    // 서버에 요청을 보냄
    return axios.post('/user/login' , loginData , {
        withCredentials: true,
    });
};

function* login(action) {
    try{
        const result = yield call(loginAPI , action.data); 
        // yield delay(2000)
        yield put({
            type : LOG_IN_SUCCESS,
            data : result.data
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

function signUPAPI(signUpData) {
    // 서버에 요청을 보냄
    return axios.post('/user/' , signUpData);
};

function* signUp(action) {
    try{
        yield call(signUPAPI , action.data);
        // yield delay(1000)
        // throw new Error('에러입니다.');
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