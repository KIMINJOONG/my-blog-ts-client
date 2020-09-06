import React, { useState, useCallback, useEffect } from "react";
import { Col, Card, Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addCommentAction } from "../reducers/board";

const CommentForm = () => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const { me } = useSelector((state: any) => state.user);
    const { board, addCommentLoading, addCommentDone } = useSelector(
        (state: any) => state.board
    );
    const onSubmit = useCallback(
        async (e) => {
            dispatch(addCommentAction(board.data.id, comment));
        },
        [comment]
    );

    useEffect(() => {
        if (addCommentDone) {
            setComment("");
        }
    }, [addCommentDone]);
    return (
        <Col md={24} xs={24} sm={24} lg={24}>
            <Card>
                <Form.Item>
                    <Input.TextArea
                        rows={4}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        htmlType="submit"
                        loading={addCommentLoading}
                        onClick={onSubmit}
                        type="primary"
                        disabled={me && me.data ? false : true}
                    >
                        댓글등록
                    </Button>
                </Form.Item>
            </Card>
        </Col>
    );
};

export default CommentForm;
