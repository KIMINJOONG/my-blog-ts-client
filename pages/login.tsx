import { Row, Col, Form, Input, Button, message } from "antd";
import Link from "next/link";
import Router from "next/router";
import { useCallback, useState, ChangeEvent, useContext } from "react";
import api from "../api";
import jsCookie from "js-cookie";
import userStore from "../stores/userStore";
import { Spin } from "antd";
import AppLayout from "../components/AppLayout";

interface ILoginForm {
  email: string;
  password: string;
}

const useForm = (initValue: ILoginForm) => {
  const [value, setValue] = useState(initValue);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    [value],
  );

  return { value, onChange };
};
const Login = () => {
  const userState = useContext(userStore);
  const [loading, setLoading] = useState(false);

  const loginForm = useForm({
    email: "",
    password: "",
  });
  const onSubmit = useCallback(
    async (values) => {
      setLoading(true);
      const result = await api.login("/users/login", values);
      const { data, status: httpStatus } = result;
      if (httpStatus === 200) {
        if (data.success) {
          message.success("로그인되었습니다.");
          await jsCookie.set("token", data.data);
          Router.push("/");
        } else {
          message.error(data.data.message);
        }
      } else {
        message.error(data.message);
      }
      setLoading(false);
    },
    [userState],
  );
  return (
    <AppLayout>
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
            {loading
              ? (
                <Spin />
              )
              : (
                <Form onFinish={onSubmit}>
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
                    <Input
                      name="email"
                      value={loginForm.value.email}
                      onChange={loginForm.onChange}
                    />
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
                    <Input.Password
                      name="password"
                      value={loginForm.value.password}
                      onChange={loginForm.onChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      style={{ marginBottom: "10px" }}
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
              )}
          </Col>
        </Row>
      </div>
    </AppLayout>
  );
};

export default Login;
