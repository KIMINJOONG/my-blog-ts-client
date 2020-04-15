import { FunctionComponent } from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";

const Header = styled(Col)`
    width: 100%;
    height: 50px;
    position: fixed;
    background-color: #202020;
    z-index: 9999;
    border-bottom: 1px solid #202020;
`;

const Navigation = styled(Col)`
    position: relative;
    margin: 0 auto;
`;

const Ul = styled.ul`
    float: left;

    & > li {
        vertical-align: middle;
        display: inline-block;
        margin-right: 25px;
        position: relative;
        color: #ffffff;
    }
`;

const AppLayout: FunctionComponent = ({ children }) => {
    return (
        <Layout>
            <Row>
                <Header>
                    <Row style={{ height: "100%" }}>
                        <Navigation span={12}>
                            <Ul>
                                <li>Home</li>
                                <li>Home2</li>
                                <li>Home3</li>
                            </Ul>
                        </Navigation>
                    </Row>
                </Header>
            </Row>
            <Row style={{ paddingTop: "50px" }}>
                <Col span={24}>
                    <Row style={{ padding: "70px 0" }}>
                        <Col span={24}>
                            <Row>
                                <Col
                                    span={12}
                                    style={{
                                        margin: "0 auto",
                                        textAlign: "center",
                                    }}
                                >
                                    <h1>코후비 블로그</h1>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={12} style={{ margin: "0 auto" }}>
                            <Row>
                                <Col span={17}>컨텐츠</Col>
                                <Col span={7}>사이드바</Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
};

export default AppLayout;
