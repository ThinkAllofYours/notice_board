import { useState } from "react";
import { Container } from "react-bootstrap";
import PyboAlert from "../components/pyboAlert";
import PyboNavBar from "../components/pyboNavBar";
import PyboNoticeList from "../components/pyboNoticeList";
import PyboPagination from "../components/pyboPagination";
import PyboSpinner from "../components/pyboSpinner";
import { useNoticeList } from "./api/notice/noticeData";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home({ page }) {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(page || 1);
  const { notices, isLoding, totalPages } = useNoticeList(currentPage);
  if (isLoding) {
    return <PyboSpinner />;
  }
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <PyboNavBar />
      <Container>
        {notices.length === 0 ? (
          <PyboAlert variant={"warning"}>No notices found</PyboAlert>
        ) : (
          <>
            <PyboPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
            <PyboNoticeList notices={notices} />
          </>
        )}
      </Container>
    </div>
  );
}
