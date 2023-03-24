import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import FormattedDate from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faBookOpenReader, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/PyboNavBar.module.css";
import Link from "next/link";

const PyboNoticeCard = ({ notice }) => {
  return (
    <Card className={`shadow-sm p-3 mb-2 rounded ${styles.noticeCard}`}>
      <Row className="align-items-center">
        <Col md={10} className="mb-3 mb-md-0">
          <Link href={{pathname: "/notice/page", query: {notice_id:notice.id}}}>
            <h5 className="text-primary mb-2">{notice.title}</h5>
          </Link>
          <p className="text-sm text-muted mb-0">
            <span className="mx-1">Posted</span>
            <span className="mx-2">
              <FormattedDate dateString={notice.created_date} />
            </span>
            <span className="mx-1">ago by</span>
            <span className="mx-2">{notice.author_name}</span>
          </p>
        </Col>
        <Col md={2} className="d-flex justify-content-start">
        <FontAwesomeIcon icon={faBookOpenReader} className="mx-3" />
                {notice.views_count}
        </Col>
      </Row>
    </Card>
  );
};

export default PyboNoticeCard;
