import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeAndUserName, useRemoveEmployeeMutation } from '../../app/services/employees';
import { Modal } from 'antd';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import paths from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { message } from 'antd';
import ActionsButtons from '../actions-buttons/ActionsButtons';

interface Props {
    employeeData: EmployeeAndUserName
};

const EmployeeActions: FC<Props> = ({ employeeData }) => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [removeEmployee] = useRemoveEmployeeMutation();

    const handleDeleteUser = async () => {
        setIsModalOpen(false);

        try {
            message.loading("Происходит удаление сотрудника, ожидайте", 2);

            await removeEmployee(employeeData.id).unwrap();

            navigate(`${paths.status}/deleted`);
        } catch (e) {
            if (isErrorWithMessage(e)) setError(e.data.message);
            else setError("Неизвестная ошибка");
        };
    };

    return (
        <>
            <ActionsButtons employeeId={employeeData.id} setIsModalOpen={setIsModalOpen} />
            <ErrorMessage message={error} />
            <Modal
                title="Подтвердите удаление"
                open={isModalOpen}
                onOk={handleDeleteUser}
                onCancel={() => setIsModalOpen(false)}
                okText="Подтвердить"
                cancelText="Отменить"
            >
                Вы действительно хотите удалить сотрудника из таблицы?
            </Modal>
        </>
    )
};

export default EmployeeActions;