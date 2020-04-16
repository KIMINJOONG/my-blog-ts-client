import { FunctionComponent } from "react";
import { Layout, Row, Col, Divider } from "antd";
import {
    Header,
    Ul,
    Navigation,
    MainHeaderSectionCol,
    MainHeaderSection,
    MainHeaderContainer,
    MainContentRow,
    MainContentCol,
    LeftUl,
    Logo,
} from "./style";
import Link from "next/link";

const AppLayout: FunctionComponent = ({ children }) => {
    return (
        <Layout>
            <Row>
                <Header>
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
                                    <a>
                                        <Link href="/login">
                                            <a>로그인</a>
                                        </Link>
                                    </a>
                                </li>
                            </LeftUl>
                        </Navigation>
                    </Row>
                </Header>
            </Row>
            <MainHeaderContainer>
                <Col span={24}>
                    <MainHeaderSection>
                        <Col span={24}>
                            <Row>
                                <MainHeaderSectionCol span={16}>
                                    <Divider
                                        style={{
                                            borderBottom: "1px solid black",
                                        }}
                                    >
                                        Latest
                                    </Divider>
                                </MainHeaderSectionCol>
                            </Row>
                        </Col>
                    </MainHeaderSection>
                </Col>
            </MainHeaderContainer>
            <MainContentRow style={{ height: "100vh" }}>
                <Col span={24}>
                    <Row>
                        <MainContentCol span={16}>
                            <Row>
                                <Col span={24}>{children}</Col>
                            </Row>
                        </MainContentCol>
                    </Row>
                </Col>
            </MainContentRow>
        </Layout>
    );
};

export default AppLayout;
