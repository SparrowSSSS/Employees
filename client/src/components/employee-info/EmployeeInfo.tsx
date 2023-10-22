import { FC } from 'react';
import { EmployeeAndUserName } from '../../app/services/employees';
import { Descriptions } from 'antd';

interface Props {
    data: EmployeeAndUserName,
    userId?: string
}

const EmployeeInfo: FC<Props> = ({data, userId}) => {
    return (
        <Descriptions title="Информация о сотруднике" bordered={true} column={5}>
            <Descriptions.Item label="Имя" span={5}>
                {data.firstName}
            </Descriptions.Item>
            <Descriptions.Item label="Фамилия" span={5}>
                {data.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Возраст" span={5}>
                {data.age}
            </Descriptions.Item>
            <Descriptions.Item label="Адрес" span={5}>
                {data.address}
            </Descriptions.Item>
            <Descriptions.Item label="Прикреплённый пользователь" span={5}>
                {data.userId === userId ? data.userName + "(Вы)" : data.userName}
            </Descriptions.Item>
        </Descriptions>
    )
};

export default EmployeeInfo;