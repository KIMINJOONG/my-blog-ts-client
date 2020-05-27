import { FunctionComponent, useContext, useCallback, useState } from "react";
import { Layout, Row, Col, Button, message, Drawer } from "antd";
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
import { MdFormatIndentIncrease, MdFormatIndentDecrease } from "react-icons/md";
import Router from "next/router";

const AppLayout: FunctionComponent = ({ children }) => {
    const userState = useContext(userStore);
    const [visible, setVisible] = useState(false);

    const onClickLogout = useCallback(async () => {
        await jsCookie.remove("token");
        userState.getMe();
        message.success("로그아웃 되었습니다");
    }, [userState]);

    const onClose = useCallback(() => {
        setVisible(false);
    }, [visible]);

    const clickPage = useCallback((path) => {
        Router.push(path);
        setVisible(false);
    }, []);
    return (
        <Layout>
            <Row>
                <Header>
                    <Row justify="center">
                        {/* pc헤더 */}
                        <Col xs={0} md={16}>
                            <Navigation>
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
                                <Logo>
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
                        </Col>
                        {/* 모바일 헤더 */}
                        <Col xs={24} md={0}>
                            {visible ? (
                                <MdFormatIndentDecrease
                                    style={{ color: "white" }}
                                    size={30}
                                    onClick={() => setVisible(false)}
                                />
                            ) : (
                                <MdFormatIndentIncrease
                                    style={{ color: "white" }}
                                    size={30}
                                    onClick={() => setVisible(true)}
                                />
                            )}

                            <Drawer
                                title="Basic Drawer"
                                placement={"left"}
                                closable={false}
                                onClose={onClose}
                                visible={visible}
                                key={"key"}
                            >
                                <p onClick={() => clickPage("/boards")}>
                                    Board
                                </p>
                                <p onClick={() => clickPage("/videos")}>
                                    Video
                                </p>
                                <p onClick={() => clickPage("/about")}>About</p>
                            </Drawer>
                        </Col>
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
