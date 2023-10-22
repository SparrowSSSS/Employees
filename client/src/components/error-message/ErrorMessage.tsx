import React, { FC } from 'react';
import { Alert } from "antd";

interface IErrorMessageProps {
    message?: string
};

const ErrorMessage: FC<IErrorMessageProps> = ({ message }) => {
    if (!message) return null;

    return <Alert message={message} type="error" />
};

export default ErrorMessage;