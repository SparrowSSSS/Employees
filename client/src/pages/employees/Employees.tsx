import Layout from '../../components/layout/Layout';
import { Table } from 'antd';
import { useGetAllEmployeesQuery } from '../../app/services/employees';
import { useNavigate } from 'react-router-dom';
import paths from '../../paths';
import columns from './columns';
import { useState } from 'react';
import EmployeesTop from './EmployeesTop';
import useFilterEmployees from './useFilterEmployees';

const Employees = () => {

    const navigate = useNavigate();

    const [isLoadingSearch, setIsLoadingSearch] = useState(false);

    const { data, isLoading } = useGetAllEmployeesQuery();
    const [filter, setFilter] = useState({nameFilter: "", addressFilter: ""});

    const filteredEmployees = useFilterEmployees(filter.nameFilter, filter.addressFilter, data);

    if(isLoadingSearch) setIsLoadingSearch(false);

    return (
        <Layout>
            <EmployeesTop isLoadingSearch={isLoadingSearch} setFilter={setFilter} setIsLoadingSearch={setIsLoadingSearch} />
            <Table
                loading={isLoading || isLoadingSearch}
                dataSource={filteredEmployees}
                pagination={{ position: ["bottomCenter"], simple: true }}
                columns={columns}
                rowKey={(record) => record.id}
                onRow={(record) => {
                    return { onClick: () => navigate(`${paths.employee}/${record.id}`) }
                }}
            />
        </Layout>
    )
};

export default Employees;
