import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Card, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import paths from '../../paths';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import RegisterForm from '../../components/auth-forms/RegisterForm';

const Register = () => {

  const [error, setError] = useState("");

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <RegisterForm setError={setError} />
          <Space direction="vertical" size="large">
            <Typography.Text>Есть аккаунт? <Link to={paths.login}>Войдите</Link></Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
};

export default Register;
