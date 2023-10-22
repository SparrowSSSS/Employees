import { FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Space } from 'antd';
import MyButton from '../my-button/MyButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import paths from '../../paths';

interface Props {
    employeeId: string,
    setIsModalOpen: (value: SetStateAction<boolean>) => void
};

const ActionsButtons: FC<Props> = ({employeeId, setIsModalOpen}) => {
    return (
        <>
            <Divider orientation='left'>Действие</Divider>
            <Space>
                <Link to={`${paths.employeeEdit}/${employeeId}`}>
                    <MyButton shape="round" type="default" icon={<EditOutlined />}>
                        Редактировать
                    </MyButton>
                </Link>
                <MyButton shape="round" danger onClick={() => setIsModalOpen(true)} icon={<DeleteOutlined />}>
                    Удалить
                </MyButton>
            </Space>
        </>
    )
};

export default ActionsButtons;
