import { FunctionComponent } from "react";
import { Row, Col } from "antd";

const AppLayout: FunctionComponent = ({ children }) => {
  return (
    <div>
      <Row justify="center" style={{ backgroundColor: "#fafafa" }}>
        <Col xs={24} md={15}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
