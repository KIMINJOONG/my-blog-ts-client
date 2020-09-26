import { Row, Col, Form, Input, Button, message } from "antd";
import { useCallback, useState, ChangeEvent, useEffect } from "react";
import Router from "next/router";
import api from "../../api";
import { joinRequestAction } from "../../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";

interface IJoinForm {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}
const useForm = (initValue: IJoinForm) => {
  const [value, setValue] = useState(initValue);

  const onClick = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    [value],
  );

  return { value, onClick };
};
const join = () => {
  const dispatch = useDispatch();
  const { joinUserDone, joinUserError, joinUser } = useSelector((state: any) =>
    state.user
  );
  const joinForm = useForm({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });

  const onSubmit = useCallback(
    (values) => {
      dispatch(joinRequestAction(values));
    },
    [joinForm],
  );

  useEffect(() => {
    if (joinUserDone) {
      message.success(joinUser.message);
      Router.push("/login");
    }
    if (joinUserError) {
      message.error(joinUserError.message);
    }
  }, [joinUserDone, joinUserError]);
  return (
    <AppLayout>
      <div
        style={{
          margin: "0 auto",
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
                  value={joinForm.value.email}
                  onChange={joinForm.onClick}
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
                  value={joinForm.value.password}
                  onChange={joinForm.onClick}
                />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (
                        !value ||
                        getFieldValue("password") === value
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!",
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  name="passwordConfirm"
                  value={joinForm.value.passwordConfirm}
                  onChange={joinForm.onClick}
                />
              </Form.Item>
              <Form.Item
                name="name"
                label={<span>Nickname&nbsp;</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  name="name"
                  value={joinForm.value.name}
                  onChange={joinForm.onClick}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  회원가입
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </AppLayout>
  );
};

export default join;
