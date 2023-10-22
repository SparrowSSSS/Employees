import { Form, Input } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { FC, PropsWithChildren } from 'react';

interface IMyInput {
  name: NamePath,
  placeholder?: string,
  type?: string
}

const MyInput: FC<IMyInput> = ({name, placeholder, type = "text"}) => {
  return (
    <Form.Item name={name} shouldUpdate={true} rules={[{required: true, message: "Обязательное поле"}]}>
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  )
};

export default MyInput;