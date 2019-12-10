import { all, fork , takeLatest , takeEvery , call , put , delay} from 'redux-saga/effects'
import { LOG_IN_REQUEST , LOG_IN_SUCCESS , LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST } from '../reducers/user';
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

function logOutAPI() {
    // 서버에 요청을 보내는 부분
    return axios.post('/user/logout', {}, {
        withCredentials: true,
    });
}
  
function* logOut() {
    try {
        // yield call(logOutAPI);
        yield call(logOutAPI);
        yield put({ // put은 dispatch 동일
            type: LOG_OUT_SUCCESS,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error: e,
        });
    }
}
  
function* watchLogOut() {
    yield takeEvery(LOG_OUT_REQUEST, logOut);
}
  
function loadUserAPI(userId) {
    // 서버에 요청을 보내는 부분
    return axios.get(userId ? `/user/${userId}` : '/user/', {
        withCredentials: true,
    });
}
  
function* loadUser(action) {
    try {
        // yield call(loadUserAPI);
        const result = yield call(loadUserAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: LOAD_USER_SUCCESS,
            data: result.data,
            me: !action.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e,
        });
    }
}
  
function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}
  

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchSignUp),
    ]);
};