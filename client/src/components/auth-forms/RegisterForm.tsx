import { FC, SetStateAction } from 'react';
import { Form } from 'antd';
import MyInput from '../../components/my-input/MyInput';
import PasswordInput from '../../components/password-input/PasswordInput';
import MyButton from '../../components/my-button/MyButton';
import { useNavigate } from 'react-router-dom';
import paths from '../../paths';
import { useRegisterMutation } from '../../app/services/auth';
import { User } from '@prisma/client';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { message } from 'antd';

interface Props {
    setError: (value: SetStateAction<string>) => void
}

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

const RegisterForm: FC<Props> = ({setError}) => {

    const navigate = useNavigate();
    const [registerUser] = useRegisterMutation();

    const register = async (data: RegisterData) => {
        try {
            message.loading("Производится регистрация, ожидайте", 2);

            await registerUser(data).unwrap();

            navigate(paths.home);
        } catch (e) {
            if (isErrorWithMessage(e)) setError(e.data.message);
            else setError("Неизвестная ошибка");
        };
    };

    return (
        <Form onFinish={register}>
            <MyInput name='name' placeholder="Name" />
            <MyInput type='email' name='email' placeholder="Email" />
            <PasswordInput name='password' placeholder='Password' />
            <PasswordInput name='confirmPassword' placeholder='Повторите пароль' />
            <MyButton type="primary" htmlType="submit">Зарегистрироваться</MyButton>
        </Form>
    )
};

export default RegisterForm;