import { Card, Col } from "antd";

const category = () => {
  return (
    <div>
      <Col span={24}>
        <Card
          title="Default size card"
          extra={<a href="#">More</a>}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
    </div>
  );
};

export default category;
