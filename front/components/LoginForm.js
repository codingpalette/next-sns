import React , {useState , useCallback} from 'react'
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import { useDispatch } from 'react-redux'
import { loginAction } from '../reducers/user';

const LoginForm = () => {
    const [userId , setUserId] = useState('');
    const [password , setPassword] = useState('');
    const dispatch = useDispatch();

    const onChangeId = (e) => {
        setUserId(e.target.value)
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    };

    const onSubmitFrom = useCallback((e) => {
        e.preventDefault();
        // console.log({
        //     userId , password
        // })
        dispatch(loginAction)
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
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
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
