import { FC, PropsWithChildren, MouseEventHandler, ReactNode } from 'react';
import { Button, Form } from 'antd';

interface IMyButton {
  htmlType?: "button" | "submit" | "reset",
  onClick?: MouseEventHandler<HTMLElement>,
  type?: "link" | "text" | "default" | "primary" | "dashed",
  danger?: boolean,
  loading?: boolean,
  shape?: "default" | "circle" | "round",
  icon?: ReactNode,
  ghost?: boolean,
  size?: "large" | "middle" | "small"
}

const MyButton: FC<PropsWithChildren<IMyButton>> = ({ children, htmlType, onClick, type, danger, loading, shape, icon, ghost, size="middle"}) => {
  return (
    <Form.Item>
      <Button htmlType={htmlType} onClick={onClick} type={type} danger={danger} loading={loading} shape={shape} icon={icon} ghost={ghost} size={size}>
        {children}
      </Button>
    </Form.Item>
  )
};

export default MyButton;