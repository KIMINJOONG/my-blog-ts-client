import { Table, Tag } from "antd";

const columns = [
    {
        title: "게시글 번호",
        dataIndex: "name",
        key: "name",
        render: (text: String) => <a>{text}</a>,
    },
    {
        title: "제목",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "요약내용",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (tags: any) => (
            <span>
                {tags.map((tag: string) => {
                    let color = tag.length > 5 ? "geekblue" : "green";
                    if (tag === "loser") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: "Action",
        key: "action",
        render: (text: String, record: any) => (
            <span>
                <a style={{ marginRight: 16 }}>Invite {record.name}</a>
                <a>Delete</a>
            </span>
        ),
    },
];

const data = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];

const boards = () => {
    return (
        <div style={{ marginTop: "58px" }}>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
export default boards;
