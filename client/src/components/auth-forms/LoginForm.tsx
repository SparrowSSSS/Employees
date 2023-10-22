import { FC, SetStateAction } from 'react';
import { Form } from 'antd';
import MyInput from '../my-input/MyInput';
import PasswordInput from '../password-input/PasswordInput';
import MyButton from '../my-button/MyButton';
import { useNavigate } from 'react-router-dom';
import { TypeUserData, useLoginMutation } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { message } from 'antd';
import paths from '../../paths';

interface Props {
    setError: (value: SetStateAction<string>) => void
};

const LoginForm: FC<Props> = ({ setError }) => {

    const [loginUser] = useLoginMutation();

    const navigate = useNavigate();

    const login = async (data: TypeUserData) => {
        try {

            message.loading("Производится вход, ожидайте", 2);

            await loginUser(data).unwrap();

            navigate(paths.home);

        } catch (error) {
            if (isErrorWithMessage(error)) setError(error.data.message); 
            else setError("Неизвестная ошибка");
        };
    };

    return (
        <Form onFinish={login}>
            <MyInput type='emai' name='email' placeholder="Email" />
            <PasswordInput name='password' placeholder='Password' />
            <MyButton type="primary" htmlType="submit">Войти</MyButton>
        </Form>
    )
};

export default LoginForm;
