import React , {useState} from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input , Checkbox, Button } from 'antd';

const Signup = () => {
    const [id , setId] = useState('');
    const [nick , setNick] = useState('');
    const [password , setPassword] = useState('');
    const [passwordCheck , setPasswordCheck] = useState('');
    const [term , setTerm] = useState(false);

    const onSubmit = () => {

    };
    const onChangeId = (e) => {
        setId(e.target.value)
    };
    const onChangeNick = (e) => {
        setNick(e.target.value)
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    };
    const onChangePasswordCheck = (e) => {
        setPasswordCheck(e.target.value)
    };
    const onChangeTerm = (e) => {
        setTerm(e.target.value)
    };
    

    return(
        <>
        <Head>
            <title>SNS</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.css" />
        </Head>
        <AppLayout>
            <Form onSubmit={onSubmit} style={{ padding:10 }}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" required value={id} onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input name="user-nick" required  value={nick} onChange={onChangeNick} />
                </div>
                <div>
                    <label htmlFor="user-pass">비밀번호</label>
                    <br />
                    <Input name="user-password" type="password" required  value={password} onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-pass-check">비밀번호체크</label>
                    <br />
                    <Input name="user-password-check" type="password" required value={passwordCheck} onChange={onChangePasswordCheck} />
                </div>
                <div>
                    <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의해야 합니다.</Checkbox>
                </div>
                <div>
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </div>
            </Form>
        </AppLayout>
        </>
    )
};

export default Signup;