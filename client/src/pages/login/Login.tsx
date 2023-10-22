import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Card, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import paths from '../../paths';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import LoginForm from '../../components/auth-forms/LoginForm';

const Login = () => {

  const [error, setError] = useState("");

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <LoginForm setError={setError} />
          <Space direction="vertical" size="large">
            <Typography.Text>Нет аккаунта? <Link to={paths.register}>Зарегистрируйтесь</Link></Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
};

export default Login;