import useSWR from "swr";

const backendUrl = "http://127.0.0.1:5000";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useNoticeList(page) {
  const currentPage = page || 1;
  const { data, error, isLoding } = useSWR(
    `${backendUrl}/notice/list?page=${currentPage}`,
    fetcher,
  );

  const noticesData = data ? data.notices : [];
  const totalPages = Math.ceil((data ? data.total_cnt : 1) / 10);

  return {
    notices: noticesData,
    isLoding,
    totalPages: totalPages,
  };
}

export function useNoticesDetail(id) {
  const notice_id = id || 2;
  const { data, error, isLoding } = useSWR(`${backendUrl}/notice/detail/${notice_id}`, fetcher);

  const notice = data ? data.notice : {};
  const success = data ? data.success : false;
  return {
    success,
    notice,
    isLoding,
    error,
  };
}

const deleteNotice = async (id, accessToken) => {
  const success = true;
  if (!id) {
    return !success;
  }

  try {
    const res = await fetch(`${backendUrl}/notice/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (res.ok) {
      return success;
    }
  } catch (error) {
    return !success;
    console.log(error);
  }

  return !success;
};

const modifyNotice = async ({ id, title, content, accessToken }) => {
  const success = true;
  if (!id) {
    return !success;
  }

  const formData = {
    author_name: "test_author",
    title: title,
    content: content,
  };

  try {
    const res = await fetch(`${backendUrl}/notice/modify/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      return success;
    } else {
      console.error("Failed to update notice");
    }
  } catch (err) {
    console.error("Failed to update notice", err);
  }
  return !success;
};

const createNotice = async ({ useremail, title, content, accessToken }) => {
  const success = true;

  const formData = {
    author_name: useremail || "UDACITY KOREA PARTNER",
    title: title,
    content: content,
  };

  try {
    const res = await fetch(`${backendUrl}/notice/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      return success;
    } else {
      console.error("Failed to create notice");
      return !success;
    }
  } catch (err) {
    console.error("Failed to create notice", err);
  }
  return !success;
};

const useReplies = (notice_id) => {
  const { data, error, isLoading } = useSWR(`${backendUrl}/reply/list/${notice_id}`, fetcher);

  const replies = data ? data.replies : [];

  return {
    replies,
    isLoading,
    error,
  };
};

const createReply = async ({ notice_id, author_name, content }) => {
  const success = true;

  const formData = {
    author_name,
    content,
    notice_id,
  };

  try {
    const res = await fetch(`${backendUrl}/reply/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      return success;
    } else {
      console.error("Failed to create reply");
      return !success;
    }
  } catch (err) {
    console.error("Failed to create reply", err);
  }
  return !success;
};

export function incrementViewCount(noticeId) {
  if (!noticeId) {
    return;
  }
  try {
    const response = fetch(`${backendUrl}/notice/increment-view/${noticeId}`, {
      method: "PUT",
    });

    if (response.ok) {
      console.log("View count incremented successfully");
    } else {
      console.error("Failed to increment view count");
    }
  } catch (err) {
    console.error("Failed to increment view count", err);
  }
}

export { deleteNotice, modifyNotice, createNotice, useReplies, createReply };
