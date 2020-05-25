import { FunctionComponent, useContext, useCallback } from "react";
import { Layout, Row, Col, Button, message } from "antd";
import {
    Header,
    Ul,
    Navigation,
    MainContentRow,
    MainContentCol,
    LeftUl,
    Logo,
} from "./style";
import Link from "next/link";
import userStore from "../../stores/userStore";
import jsCookie from "js-cookie";

const AppLayout: FunctionComponent = ({ children }) => {
    const userState = useContext(userStore);

    const onClickLogout = useCallback(async () => {
        await jsCookie.remove("token");
        userState.getMe();
        message.success("로그아웃 되었습니다");
    }, [userState]);
    return (
        <Layout>
            <Row>
                {/* pc헤더 */}
                <Header xs={0}>
                    <Row style={{ height: "100%" }}>
                        <Navigation span={16}>
                            <Ul>
                                <li>
                                    <Link href="/">
                                        <a>Home</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/boards">
                                        <a>Board</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/videos">
                                        <a>Video</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about">
                                        <a>About</a>
                                    </Link>
                                </li>
                            </Ul>
                            <Logo
                                style={{
                                    display: "flex",
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Link href="/">
                                    <a>
                                        <h1>Kohubi's Blog</h1>
                                    </a>
                                </Link>
                            </Logo>
                            <LeftUl>
                                <li>
                                    {userState &&
                                    userState.value &&
                                    userState.value.id ? (
                                        <Button
                                            onClick={onClickLogout}
                                            type="link"
                                            ghost
                                        >
                                            <a>로그아웃</a>
                                        </Button>
                                    ) : (
                                        <Link href="/login">
                                            <a>로그인</a>
                                        </Link>
                                    )}
                                </li>
                            </LeftUl>
                        </Navigation>
                    </Row>
                </Header>
            </Row>
            <MainContentRow style={{ height: "100%" }}>
                <Col span={24}>
                    <Row style={{ height: "100%" }}>
                        <MainContentCol xs={24} sm={24} md={16}>
                            <Row style={{ height: "100%" }}>
                                <Col span={24} style={{ height: "100%" }}>
                                    {children}
                                </Col>
                            </Row>
                        </MainContentCol>
                    </Row>
                </Col>
            </MainContentRow>
        </Layout>
    );
};

export default AppLayout;
