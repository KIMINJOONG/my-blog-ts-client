import { Col, Table, Input, Divider, Button, Row, Form } from "antd";
import { useEffect, useCallback, useState } from "react";
import api from "../../api";
import { stat } from "fs";

const dummy: any = [
  { id: 1, code: 1, name: "게시글" },
  { id: 2, code: 2, name: "동영상" },
];

type Align = "left" | "right" | "center";

const columns = [
  {
    title: "번호",
    dataIndex: "id",
    key: "id",
    width: "20%",
    align: "center" as Align,
  },
  {
    title: "코드",
    dataIndex: "code",
    key: "code",
    align: "center" as Align,
  },
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
    width: "20%",
    align: "center" as Align,
  },
];

const useInput = (defaultValue: string | number) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return { value, onChange };
};

const category = () => {
  const [categories, setCategories] = useState([]);
  const nameInput = useInput("");
  const codeInput = useInput("");
  const init = useCallback(async () => {
    const result = await api.index("/categories");

    const { data, status } = result;
    if (status === 200) {
      setCategories(data.data);
    }
  }, []);
  useEffect(() => {
    init();
  }, []);

  const onSubmit = useCallback(async () => {
    const submitData: any = {
      code: codeInput.value,
      name: nameInput.value,
    };
    const result = await api.create(`/categories`, submitData);
    const { data, status } = result;
    if (status === 200) {
      setCategories(categories.concat(data.data));
    }
  }, [nameInput, codeInput, categories]);

  const onClickRemove = useCallback(async (id: number) => {
    // const result = await api.destroy(`/categories/${id}`);
    // const { status } = result;
    // if (status === 200) {
    setCategories(categories.filter((category: any) => category.id !== id));
    // }
  }, [categories]);
  return (
    <div>
      <Col span={24}>
        <Row>
          <Form layout="inline" onFinish={onSubmit}>
            <Form.Item label={"코드"} name={"코드"}>
              <Input
                placeholder={"코드를 입력해주세요"}
                value={codeInput.value}
                onChange={codeInput.onChange}
              />
            </Form.Item>
            <Form.Item label={"코드명"} name={"코드명"}>
              <Input
                placeholder={"코드명을 입력해주세요"}
                value={nameInput.value}
                onChange={nameInput.onChange}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">추가</Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
      <Col span={24}>
        <Divider />
      </Col>

      <Col span={24}>
        {categories && (
          <Table
            rowKey={(record: any) => record.id}
            columns={columns}
            dataSource={categories}
          >
          </Table>
        )}
      </Col>
    </div>
  );
};

export default category;
