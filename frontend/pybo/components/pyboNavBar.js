import React from "react";
import { Container, Row, Col, Nav, Button, Card, Alert } from "react-bootstrap";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import PyboNoticeEdit from "./pyboNoticeEdit";
import { useState } from "react";

const PyboNavBar = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useUser();
  const [alertMessage, setAlertMessage] = useState(null);
  // ... other states and functions

  const showCreateNoticeForm = () => {
    setIsCreating(true);
  };

  const onCancel = () => {
    setIsCreating(false);
  };

  const onSubmit = async ({ title, content }) => {
    const response = await fetch(`/api/noticeHandler`, {
      method: "POST",
      body: JSON.stringify({
        useremail: user.email,
        title,
        content,
      }),
    });

    if (response.status !== 201) {
      setAlertMessage({ type: "success", text: "Notice created successfully" });
    } else {
      setAlertMessage({ type: "danger", text: "Failed to create notice" });
    }

    setIsCreating(false);
  };

  return (
    <Container>
      <Row className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Col
          md={3}
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <Link className="text-dark text-decoration-none" href="/">
            Udacity Partner Korea Board
          </Link>
        </Col>

        <Col md={6} className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <Nav className="justify-content-center">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Col>

        <Col md={3} className="text-end">
          {!user ? (
            <Link href="/api/auth/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <div className="d-flex justify-content-end">
              <Button variant="light" onClick={showCreateNoticeForm} className="mx-2">
                Create Notice
              </Button>
              <Link href="/api/auth/logout">
                <Button>Logout</Button>
              </Link>
            </div>
          )}
        </Col>
      </Row>
      <Container>
        {/* Display the alert message if it exists */}
        {alertMessage && (
          <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible>
            {alertMessage.text}
          </Alert>
        )}
        {/* Rest of the code */}
      </Container>
      {isCreating && (
        <div className="mb-2">
          <Card>
            <Card.Header as={"h6"}>Create Notice</Card.Header>
            <Card.Body>
              <PyboNoticeEdit onSubmit={onSubmit} onCancel={onCancel} />
            </Card.Body>
          </Card>
          <hr />
        </div>
      )}
    </Container>
  );
};

export default PyboNavBar;
