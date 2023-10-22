import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/services/employees';
import Layout from '../../components/layout/Layout';
import { Row } from 'antd';
import EmployeeForm from '../../employee-form/EmployeeForm';
import { Employee } from '@prisma/client';
import paths from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import Loading from '../../components/loading/Loading';
import { message } from 'antd';

const EditEmployee = () => {

    const params = useParams();

    const navigate = useNavigate();

    const {data, isLoading} = useGetEmployeeQuery(params.id || "");

    const [error, setError] = useState("");

    const [editEmployee] = useEditEmployeeMutation();

    if (isLoading) return <Loading />

    const handleEditUser = async (employee: Employee) => {
        try {
            message.loading("Производится редактирование сотрудника, ожидайте", 2);

            const editedEmployee = {
                ...data,
                ...employee
            };

            await editEmployee(editedEmployee).unwrap();

            navigate(`${paths.status}/updated`);
        } catch(e) {
            if (isErrorWithMessage(e)) setError(e.data.message);
            else setError("Неизвестная ошибка");
        };
    };

    return (
        <Layout>
            <Row align="middle" justify="center" >
                <EmployeeForm 
                    title="Редактировать сотрудника"
                    btnText="Редактировать"
                    error={error}
                    employee={data}
                    onFinish={handleEditUser}
                    type="edit"
                />
            </Row>
        </Layout>
    )
};

export default EditEmployee;
