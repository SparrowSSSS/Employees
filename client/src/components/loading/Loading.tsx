import { LoadingOutlined } from '@ant-design/icons';
import { Result, Row } from 'antd';
import React from 'react';

const Loading = () => {
    return (
        <Row align="middle" justify="center" style={{ width: "100%" }}>
            <Result
                title="Загрузка"
                subTitle="Пожалуйста, ожидайте"
                icon={<LoadingOutlined />}
            />
        </Row>
    )
};

export default Loading;