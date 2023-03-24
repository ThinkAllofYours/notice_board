import { useState, useEffect } from "react";
import { FaReply, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import PyboAlert from "./pyboAlert";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  useReplies,
  createReply,
  incrementViewCount,
} from "../pages/api/notice/noticeData";
import { toFormatSeoulTime, toLocaleString } from "../utils/utils";

export default function PyboNoticeDetail({ notice, onDelete, onEdit }) {
  if (!notice) {
    return <PyboAlert variant={"warning"}>Could not read data</PyboAlert>;
  }
  const { user } = useUser();
  const {
    title,
    author_name,
    created_date,
    content,
    views_count,
    recommends_count,
    not_recommends_count,
    id,
  } = notice;

  const { replies: fetchedReplies, isLoading: repliesLoading } = useReplies(id);
  const [replies, setReplies] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "danger" });

  useEffect(() => {
    if (fetchedReplies && fetchedReplies.length > 0) {
      setReplies(fetchedReplies);
    }
    incrementViewCount(id);
  }, [fetchedReplies, id]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const replyContent = e.target.replyContent.value;
    if (replyContent && user) {
      const newReply = {
        content: replyContent,
        author_name: user.name,
        created_date: toFormatSeoulTime(new Date()),
        notice_id: id,
      };
      const res = await createReply({ ...newReply });
      if (!res) {
        setAlert({
          show: true,
          message: "Failed to create reply.",
          variant: "danger",
        });
        return;
      }
      setReplies((prevReplies) => [...prevReplies, newReply]);
      e.target.replyContent.value = "";
    }
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, show: false });
  };

  const handleEdit = () => {
    onEdit(true);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  if (repliesLoading) {
    return <PyboAlert variant={"info"}>Loading replies...</PyboAlert>;
  }

  return (
    <Container>
      <>
        {alert.show && (
          <PyboAlert variant={alert.variant} onClose={handleAlertClose} dismissible>
            {alert.message}
          </PyboAlert>
        )}
      </>
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card className="my-4">
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <Row>
                  <Col md={8}>
                    {author_name} | {toLocaleString(created_date)}
                  </Col>
                  {user && (
                    <Col>
                      <div className="d-flex justify-content-end">
                        <Button variant="light" className="mx-2" onClick={handleEdit}>
                          Edit
                        </Button>
                        <Button variant="light" onClick={handleDelete}>
                          Delete
                        </Button>
                      </div>
                    </Col>
                  )}
                </Row>
              </Card.Subtitle>
              <hr />
              <Card.Text
                dangerouslySetInnerHTML={{ __html: content }}
                style={{ marginTop: "16px" }}
              ></Card.Text>
              <Card.Footer className="text-muted">
                <span>Views: {views_count}</span>
                <span className="ms-2">Likes: {recommends_count}</span>
                <span className="ms-2">Dislikes: {not_recommends_count}</span>
              </Card.Footer>
              <hr />
              <h6>
                Replies <FaReply style={{ verticalAlign: "middle" }} />
              </h6>
              <ul className="list-unstyled">
                {replies.map((reply, index) => (
                  <li key={index} className="border-bottom mb-3 pb-3">
                    <p>{reply.content}</p>
                    <small className="text-muted">
                      {reply.author_name} | {toLocaleString(reply.created_date)}
                    </small>
                  </li>
                ))}
              </ul>
              {user && (
                <Form onSubmit={handleReplySubmit}>
                  <Form.Group className="mb-3" controlId="replyContent">
                    <Form.Control as="textarea" rows={3} placeholder="Write a reply..." />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit Reply
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
