import { useRouter } from "next/router";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNoticesDetail } from "../api/notice/noticeData";
import PyboAlert from "../../components/pyboAlert";
import PyboNavBar from "../../components/pyboNavBar";
import PyboNoticeDetail from "../../components/pyboNoitceDetail";
import PyboNoticeEdit from "../../components/pyboNoticeEdit";
import PyboLodingBar from "../../components/pyboSpinner";

export default function NoticeDetail() {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const { notice_id } = router.query;
  const { success, notice, isLoading, error } = useNoticesDetail(notice_id);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "danger" });
  const handleAlertClose = () => {
    setAlert({ ...alert, show: false });
  };

  if (isLoading || !success) {
    return (
      <Container>
        <PyboLodingBar />
      </Container>
    );
  }

  if (error || !notice_id) {
    return <PyboAlert variant={"warning"}>Not found notice</PyboAlert>;
  }

  const onEdit = () => {
    setIsEdit(!isEdit);
  };

  const onDelete = async (notice_id) => {
    if (notice_id) {
      const response = await fetch(`/api/noticeHandler`, {
        method: "DELETE", 
        body: JSON.stringify({
          notice_id,
        }),
      });

      if (response.status === 200) {
        const result = await response.json();
        if (result.success) {
          router.push("/");
        } else {
          setAlert({
            show: true,
            message: "Failed to delete notice. Please try again.",
            variant: "danger",
          });
        }
      } else {
        setAlert({
          show: true,
          message: "Failed to delete notice. Please try again.",
          variant: "danger",
        });
      }
    }
  };

  const onCancel = () => {
    setIsEdit(!isEdit);
  };

  const onSubmit = async ({ title, content }) => {
    if (notice_id) {
      const response = await fetch(`/api/noticeHandler`, {
        method: "PATCH",
        body: JSON.stringify({
          notice_id,
          title,
          content,
        }),
      });

      if (response.status === 200) {
        const result = await response.json();
        if (result.success) {
          setAlert({
            show: true,
            message: "Notice updated successfully!",
            variant: "success",
          });
          setIsEdit(!isEdit);
          notice.title = title;
          notice.content = content;
        } else {
          setAlert({
            show: true,
            message: "Failed to update notice. Please try again.",
            variant: "danger",
          });
        }
      } else if (response.status === 401) {
        setAlert({
          show: true,
          message: "You must be logged in and have permission to update the notice.",
          variant: "danger",
        });
      } else {
        setAlert({
          show: true,
          message: "Failed to update notice. Please try again.",
          variant: "danger",
        });
      }
    }
  };

  return (
    <>
      <PyboNavBar />
      <Container>
        {alert.show && (
          <PyboAlert variant={alert.variant} onClose={handleAlertClose} dismissible>
            {alert.message}
          </PyboAlert>
        )}
        {isEdit === true ? (
          <PyboNoticeEdit notice={notice} onCancel={onCancel} onSubmit={onSubmit} />
        ) : (
          <PyboNoticeDetail notice={notice} onEdit={onEdit} onDelete={onDelete} />
        )}
      </Container>
    </>
  );
}
