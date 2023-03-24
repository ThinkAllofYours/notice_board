import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { createNotice, modifyNotice, deleteNotice } from "./notice/noticeData";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ["create:notice", "edit:notice", "delete:notice"],
    });

    let reqObject;
    try {
      reqObject = JSON.parse(req.body);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      res.status(400).json({ error: "Invalid JSON" });
      return;
    }

    if (req.method === "DELETE") {
      const { notice_id } = reqObject;
      const success = await deleteNotice(notice_id, accessToken);
      res.status(200).json({ success });
    } else if (req.method === "POST") {
      const { useremail, title, content } = reqObject;
      const success = await createNotice({useremail, title, content, accessToken});
      res.status(200).json({ success });
    } else if (req.method === "PATCH") {
      const { notice_id, title, content } = reqObject;
      const success = await modifyNotice({ id: notice_id, title, content, accessToken });
      res.status(200).json({ success });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: "Server Error" });
  }
});
