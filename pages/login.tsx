import { Row, Col, Form, Input, Button } from "antd";
import Link from "next/link";
import { useCallback } from "react";

const Login = () => {
    const onSubmit = useCallback((e) => {
        e.preventDefault();
    }, []);
    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Row>
                <Col>
                    <Form>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!",
                                },
                                {
                                    required: true,
                                    message: "Please input your E-mail!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                onClick={onSubmit}
                            >
                                Login
                            </Button>
                            <Button type="primary" block>
                                <Link href="/join">
                                    <a>회원가입</a>
                                </Link>
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
