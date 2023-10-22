import MyButton from '../../components/my-button/MyButton';
import { PlusCircleOutlined, RollbackOutlined, SearchOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import paths from '../../paths';
import { FC, SetStateAction } from 'react';

interface Props {
    isLoadingSearch: boolean,
    setIsLoadingSearch: (value: SetStateAction<boolean>) => void,
    setFilter: (value: SetStateAction<{ nameFilter: string, addressFilter: string }>) => void
}

const EmployeesTop: FC<Props> = ({ isLoadingSearch, setFilter, setIsLoadingSearch }) => {

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const handleSearch = (value: { name: string, address: string }) => {
        if (value.address === undefined) value.address = "";
        if (value.name === undefined) value.name = "";
        setFilter({ addressFilter: value.address, nameFilter: value.name });
        setIsLoadingSearch(true);
    };

    return (
        <Row>
            <Col span={8}>
                <MyButton type="primary" onClick={() => navigate(paths.employeeAdd)} icon={<PlusCircleOutlined />}>
                    Добавить
                </MyButton>
            </Col>
            <Col span={12} offset={3}>
                <Form name='search-form' onFinish={handleSearch} form={form}>
                    <Row>
                        <Col span={7}>
                            <Form.Item name="name">
                                <Input placeholder="Поиск по имени" type="text" />
                            </Form.Item>
                        </Col>
                        <Col span={7} offset={1}>
                            <Form.Item name="address">
                                <Input placeholder="Поиск по адресу" type="text" />
                            </Form.Item>
                        </Col>
                        <Col span={2} offset={1}>
                            <Form.Item>
                                <Button htmlType="submit" icon={<SearchOutlined />} loading={isLoadingSearch}>
                                    Поиск
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={2} offset={4}>
                            <Form.Item>
                                <Button
                                    htmlType="button"
                                    icon={<RollbackOutlined />}
                                    loading={isLoadingSearch}
                                    onClick={
                                        () => {
                                            setFilter({ nameFilter: "", addressFilter: "" });
                                            form.resetFields();
                                        }
                                    }

                                >
                                    Сброс
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
};

export default EmployeesTop;