import { Navigate, useParams } from 'react-router-dom';
import { useGetEmployeeQuery } from '../../app/services/employees';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import Layout from '../../components/layout/Layout';
import Loading from '../../components/loading/Loading';
import EmployeeInfo from '../../components/employee-info/EmployeeInfo';
import EmployeeActions from '../../components/employee-actions/EmployeeActions';


const Employee = () => {

    const params = useParams<{ id: string }>();
    const { data, isLoading } = useGetEmployeeQuery(params.id || "");
    const user = useSelector(selectUser);

    if (isLoading) return <Loading />

    if (!data) return <Navigate to="/" />

    return (
        <Layout>
            <EmployeeInfo data={data} userId={user?.id} />
            {user?.id === data.userId && <EmployeeActions employeeData={data} />}
        </Layout>
    )
};

export default Employee;