import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
export default function PyboNoticeEdit({ onSubmit, notice, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRows = notice ? Math.ceil(notice.content.length / 30) : 20;

  useEffect(() => {
    if (notice) {
      setTitle(notice.title || "");
      setContent(notice.content || "");
    }
  }, [notice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  const handleCancel = () => {
    onCancel(true);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="content" className="mt-4">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={textareaRows}
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-2">
              <Button variant="primary" type="submit" className="mx-2">
                Save
              </Button>
              <Button variant="danger" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
