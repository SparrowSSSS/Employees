import {useState} from 'react';
import Layout from '../../components/layout/Layout';
import { Row } from 'antd';
import EmployeeForm from '../../employee-form/EmployeeForm';
import { useNavigate } from 'react-router-dom';
import { useAddEmployeeMutation } from '../../app/services/employees';
import paths from '../../paths';
import { Employee } from '@prisma/client';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { message } from 'antd';

const AddEmployee = () => {

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const [addEmployee] = useAddEmployeeMutation();

    const handleAddEmployee = async (data: Employee) => {
        try {
            message.loading("Производится добавление сотрудника, ожидайте", 2);

            await addEmployee(data).unwrap();

            navigate(`${paths.status}/created`)
        } catch(e) {
            if (isErrorWithMessage(e)) setError(e.data.message);
            else setError("Неизвестная ошибка");
        };
    };

    return (
        <Layout>
            <Row align="middle" justify="center">
                <EmployeeForm
                    title="Добавить сотрудника"
                    btnText='Добавить'
                    onFinish={handleAddEmployee}
                    error={error}
                    type="add"
                />
            </Row>
        </Layout>
    )
};

export default AddEmployee;