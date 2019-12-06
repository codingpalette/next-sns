import React , {useState , useCallback} from 'react'
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import { useDispatch , useSelector } from 'react-redux'
import { LOG_IN_REQUEST } from '../reducers/user';

const LoginForm = () => {
    const [userId , setUserId] = useState('');
    const [password , setPassword] = useState('');
    const { isLoggingIn } = useSelector( (state) => state.user)
    const dispatch = useDispatch();

    const onChangeId = (e) => {
        setUserId(e.target.value)
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    };

    const onSubmitFrom = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type : LOG_IN_REQUEST,
            data : {
                userId ,
                password
            }
        })
    } , [userId , password])

    return(
        <>
        <Form onSubmit={onSubmitFrom} style={{padding : '10px'}}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={userId} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
                <Link href="/signup">
                    <a>
                        <Button>회원가입</Button>
                    </a>
                </Link>
            </div>
        </Form>
        </>
    )
    
};

export default LoginForm;
