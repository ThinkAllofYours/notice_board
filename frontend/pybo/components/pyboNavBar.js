import React from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const PyboNavBar = () => {
  const { user } = useUser();
  return (
    <Container>
      <Row className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Col md={3} className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          <Link className= "text-dark text-decoration-none" href="/">
              Udacity Partner Korea Board
          </Link>
        </Col>

        <Col md="auto" className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <Nav className="justify-content-center">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/notices">Notices</Nav.Link>
          </Nav>
        </Col>

        <Col md={3} className="text-end">
          {!user ? (
            <Link href="/api/auth/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <Link href="/api/auth/logout">
              <Button>Logout</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PyboNavBar;