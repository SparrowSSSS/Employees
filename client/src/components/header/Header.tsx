import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Space, Typography } from "antd";
import styles from "./Header.module.css";
import MyButton from '../my-button/MyButton';
import { Link, useNavigate } from 'react-router-dom';
import paths from '../../paths';
import { logout, selectUser } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate(paths.login);
  };

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={paths.home}>
          <MyButton type='link'>
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </MyButton>
        </Link>
      </Space>
      {user
        ? (
          <Space direction="vertical">
            <Typography.Title level={4}>Добро пожаловать, {user.name}</Typography.Title>
            <MyButton size="large" type='link' icon={<LoginOutlined />} onClick={onLogoutClick}>Выйти</MyButton>
          </Space>
        )
        : (
          <Space>
            <Link to={paths.register}>
              <MyButton type='link' icon={<UserOutlined />}>Зарегистрироваться</MyButton>
            </Link>
            <Link to={paths.login}>
              <MyButton type='link' icon={<LoginOutlined />}>Войти</MyButton>
            </Link>
          </Space>
        )
      }
    </Layout.Header>

  )
};

export default Header;
