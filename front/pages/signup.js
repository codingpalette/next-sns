import React , {useState , useCallback , useEffect} from 'react';
import { Form, Input , Checkbox, Button } from 'antd';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch , useSelector } from 'react-redux';
import Router from 'next/router';

const Signup = () => {
    const [id , setId] = useState('');
    const [nick , setNick] = useState('');
    const [password , setPassword] = useState('');
    const [passwordCheck , setPasswordCheck] = useState('');
    const [term , setTerm] = useState(false);
    const [passwordError , setPasswordError] = useState(false);
    const [termError , setTermError] = useState(false);

    const dispatch = useDispatch();
    const { isSigningUp , me} = useSelector( state => state.user );

    useEffect( () => {
        if(me) {
            Router.push('/');
        }
    }, [me && me.id])

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if(password !== passwordCheck) {
            return setPasswordError(true);
        }
        if(!term) {
            return setTermError(true);
        }
        dispatch({
            type : SIGN_UP_REQUEST,
            data : {
                id,
                nick,
                password
            }
        });
    }, [password , passwordCheck , term]);
    const onChangeId = (e) => {
        setId(e.target.value)
    };
    const onChangeNick = (e) => {
        setNick(e.target.value)
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    };
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password)
        setPasswordCheck(e.target.value)
    }, [password]);
    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked)
    }, []);
    

    return(
        <>
        
        
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
                {passwordError && <div style={{color:'red'}}>비밀번호가 일치하지 않습니다.</div> }
            </div>
            <div>
                <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>동의해야 합니다.</Checkbox>
                {termError && <div style={{color:'red'}}>약관에 동의하셔야 합니다.</div> }
            </div>
            <div style={{marginTop : 10}}>
                <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
            </div>
        </Form>

        </>
    )
};

export default Signup;