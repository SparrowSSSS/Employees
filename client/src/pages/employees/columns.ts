import { ColumnsType } from 'antd/es/table';
import { Employee } from '@prisma/client';

const columns: ColumnsType<Employee> = [
    {
        title: "Фамилия",
        dataIndex: "lastName",
        key: "lastName",
        sorter: (a, b) => a.lastName.localeCompare(b.lastName),
        sortDirections: ['ascend', 'descend']
    },

    {
        title: "Возраст",
        dataIndex: "age",
        key: "age",
        sorter: (a, b) => Number(a.age) - Number(b.age),
        defaultSortOrder: 'descend'
    },

    {
        title: "Адрес",
        dataIndex: "address",
        key: "address",
        sorter: (a, b) => a.address.localeCompare(b.address),
        sortDirections: ['ascend', 'descend']
    },
];

export default columns;