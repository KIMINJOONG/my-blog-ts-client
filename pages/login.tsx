import { Row, Col, Form, Input, Button, message } from "antd";
import Link from "next/link";
import Router from "next/router";
import { useCallback, useContext, useEffect } from "react";
import jsCookie from "js-cookie";
import userStore from "../stores/userStore";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { LOG_IN_REQUEST } from "../reducers/user";

const Login = () => {
  const { logInLoading, logInDone } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [email, onChangeEmail, setEmail] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");

  useEffect(() => {
    console.log(logInDone);
    if (logInDone) {
      message.success("로그인되었습니다.");
      setPassword("");
      Router.push("/");
    }
  }, [logInDone]);

  const onSubmit = useCallback(
    async (values) => {
      dispatch({
        type: LOG_IN_REQUEST,
        data: values,
      });
    },
    [],
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
                  value={email}
                  onChange={onChangeEmail}
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
                  value={password}
                  onChange={onChangePassword}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ marginBottom: "10px" }}
                  loading={logInLoading}
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
    </AppLayout>
  );
};

export default Login;
