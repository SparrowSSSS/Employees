import { createBrowserRouter } from 'react-router-dom';
import './index.css';
import paths from './paths';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Employees from './pages/employees/Employees';
import AddEmployee from './pages/add-employee/AddEmployee';
import Status from './pages/status/Status';
import Employee from './pages/employee/Employee';
import EditEmployee from './pages/edit-employee/EditEmployee';
import CheckUser from './features/check-user/checkUser';

const router = createBrowserRouter([
    { path: paths.home, element: <CheckUser type="private"><Employees /></CheckUser> },
    { path: paths.login, element: <CheckUser type="public"><Login /></CheckUser> },
    { path: paths.register, element: <CheckUser type="public"><Register /></CheckUser> },
    { path: paths.employeeAdd, element: <CheckUser type="private"><AddEmployee /></CheckUser> },
    { path: `${paths.status}/:status`, element: <CheckUser type="private"><Status /></CheckUser> },
    { path: `${paths.employee}/:id`, element: <CheckUser type="private"><Employee /></CheckUser> },
    { path: `${paths.employeeEdit}/:id`, element: <CheckUser type="private"><EditEmployee /></CheckUser> }
]);

export default router;