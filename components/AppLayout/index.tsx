import { FunctionComponent } from "react";
import { Layout, Row, Col } from "antd";
import {
    Header,
    Ul,
    SubUl,
    Navigation,
    MainHeaderSectionCol,
    MainHeaderSection,
    MainHeaderContainer,
    MainContentRow,
    MainContentCol,
} from "./style";

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
                            <SubUl>
                                <li>로그인</li>
                            </SubUl>
                        </Navigation>
                    </Row>
                </Header>
            </Row>
            <MainHeaderContainer>
                <Col span={24}>
                    <MainHeaderSection>
                        <Col span={24}>
                            <Row>
                                <MainHeaderSectionCol span={12}>
                                    <h1>코후비 블로그</h1>
                                </MainHeaderSectionCol>
                            </Row>
                        </Col>
                    </MainHeaderSection>
                </Col>
            </MainHeaderContainer>
            <MainContentRow style={{ height: "100vh" }}>
                <Col span={24}>
                    <Row>
                        <MainContentCol span={12}>
                            <Row>
                                <Col span={17}>{children}</Col>
                                <Col span={7}>사이드바</Col>
                            </Row>
                        </MainContentCol>
                    </Row>
                </Col>
            </MainContentRow>
        </Layout>
    );
};

export default AppLayout;
