import { Row, Col, Card } from "antd";

const Home = () => (
    <div>
        <Row>
            <Col span={24}>
                <Card
                    title="제목"
                    bordered={false}
                    headStyle={{ textAlign: "center" }}
                >
                    <img
                        style={{ width: "100%", height: "450px" }}
                        src={`https://2.bp.blogspot.com/-ErlovyvpO3o/WyGT6Vm017I/AAAAAAAAKSk/Qsoy7V4sK-kk_bkCeImrkUQIK3_X9uKjACLcBGAs/s1600/ian-dooley-347962-1240x826.jpg`}
                    />
                    Card content
                </Card>
            </Col>
        </Row>
    </div>
);

export default Home;
