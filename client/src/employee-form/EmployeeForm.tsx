import { Employee } from '@prisma/client';
import { Card, Form, Space } from 'antd';
import MyInput from '../components/my-input/MyInput';
import ErrorMessage from '../components/error-message/ErrorMessage';
import MyButton from '../components/my-button/MyButton';
import { useNavigate } from 'react-router-dom';
import paths from '../paths';

interface Props<T> {
    onFinish: (values: T) => void,
    btnText: string,
    title: string,
    error?: string,
    employee?: T,
    type: "edit" | "add"
};

const EmployeeForm = ({ onFinish, title, btnText, employee, error, type }: Props<Employee>) => {

    const navigate = useNavigate();

    function comeBack() {
        if (type === "edit") navigate(`${paths.employee}/${employee?.id}`);
        else navigate(`${paths.home}`);
    };

    return (
        <Card title={title} style={{ width: "30rem" }}>
            <Form name='employee-form' onFinish={onFinish} initialValues={employee}>
                <MyInput type="text" name="firstName" placeholder="Имя" />
                <MyInput type="text" name="lastName" placeholder="Фамилия" />
                <MyInput type="number" name="age" placeholder="Возраст" />
                <MyInput type="text" name="address" placeholder="Адрес" />
                <Space>
                    <ErrorMessage message={error} />
                    <MyButton htmlType="submit">
                        {btnText}
                    </MyButton>
                    <MyButton htmlType="button" onClick={comeBack}>
                        Назад
                    </MyButton>
                </Space>
            </Form>
        </Card>
    )
};

export default EmployeeForm;