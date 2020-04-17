import { Row, Col, Card, Divider } from "antd";

const Home = () => (
    <div>
        <Row>
            <Col span={24}>
                <Divider
                    style={{
                        borderBottom: "1px solid black",
                    }}
                >
                    Latest
                </Divider>
            </Col>
            <Col span={8}>
                <Card
                    style={{ marginRight: "10px" }}
                    title="제목"
                    bordered={false}
                    headStyle={{ textAlign: "center" }}
                >
                    <img
                        style={{ width: "100%", height: "360px" }}
                        src={`https://2.bp.blogspot.com/-ErlovyvpO3o/WyGT6Vm017I/AAAAAAAAKSk/Qsoy7V4sK-kk_bkCeImrkUQIK3_X9uKjACLcBGAs/s1600/ian-dooley-347962-1240x826.jpg`}
                    />
                    Card content
                </Card>
            </Col>
            <Col span={8}>
                <Card
                    style={{ marginRight: "10px" }}
                    title="제목"
                    bordered={false}
                    headStyle={{ textAlign: "center" }}
                >
                    <img
                        style={{ width: "100%", height: "360px" }}
                        src={`https://2.bp.blogspot.com/-ErlovyvpO3o/WyGT6Vm017I/AAAAAAAAKSk/Qsoy7V4sK-kk_bkCeImrkUQIK3_X9uKjACLcBGAs/s1600/ian-dooley-347962-1240x826.jpg`}
                    />
                    Card content
                </Card>
            </Col>
            <Col span={8}>
                <Card
                    style={{ marginRight: "10px" }}
                    title="제목"
                    bordered={false}
                    headStyle={{ textAlign: "center" }}
                >
                    <img
                        style={{ width: "100%", height: "360px" }}
                        src={`https://2.bp.blogspot.com/-ErlovyvpO3o/WyGT6Vm017I/AAAAAAAAKSk/Qsoy7V4sK-kk_bkCeImrkUQIK3_X9uKjACLcBGAs/s1600/ian-dooley-347962-1240x826.jpg`}
                    />
                    Card content
                </Card>
            </Col>
        </Row>
    </div>
);

export default Home;
