import unittest
import json
from pybo.database.models import Notice
from pybo import create_app


class PyboTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client()

    def tearDown(self):
        """Excute after reach test"""
        pass

    # Notice tests
    """get_notices"""

    def test_get_notices(self):
        res = self.client.get("/notices/list?page=1")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertEqual(len(data["notices"]), 10)

    def test_get_notices_fail(self):
        res = self.client.get("/notices?page=-1")
        self.assertEqual(res.status_code, 404)

    """get_notice_detail"""

    def test_get_notice_detail(self):
        notice_id = 2
        res = self.client.get(f"/notices/detail/{notice_id}")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["notice"])

    def test_get_notice_detail_fail(self):
        # Set a non-existing Notice ID
        non_existing_notice_id = 9999
        res = self.client.get(f"/notices/detail/{non_existing_notice_id}")
        self.assertEqual(res.status_code, 404)

    """test_create_notice """

    def test_create_notice(self):
        new_notice = {
            "author_name": "Test Author",
            "title": "Test Notice Title",
            "content": "This is a test notice content.",
        }
        res = self.client.post("/notices/create", json=new_notice)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 201)
        self.assertTrue(data["id"])

    def test_create_notice_fail(self):
        invalid_notice = {
            "author_name": "Test Author",
            "title": "",  # Empty title
            "content": "This is a test notice content.",
        }
        res = self.client.post("/notices/create", json=invalid_notice)
        self.assertEqual(res.status_code, 400)

    """modify_notice"""

    def test_modify_notice(self):
        notice_id = 2
        update_notice = {
            "author_name": "Updated Author",
            "title": "Updated Notice Title",
            "content": "This is an updated test notice content.",
        }
        res = self.client.post(f"/notices/modify/{notice_id}", json=update_notice)
        data = json.loads(res.data)
        notice = data["notice"]

        self.assertEqual(res.status_code, 200)
        self.assertEqual(notice["title"], "Updated Notice Title")

    def test_modify_notice_fail(self):
        non_existing_notice_id = 9999
        update_notice = {
            "author_name": "Updated Author",
            "title": "Updated Notice Title",
            "content": "This is an updated test notice content.",
        }
        res = self.client.post(f"/notices/modify/{non_existing_notice_id}", json=update_notice)
        self.assertEqual(res.status_code, 404)

    """ delete_notice """

    def test_delete_notice(self):
        new_notice = {
            "author_name": "Test Author",
            "title": "Test Notice Title",
            "content": "This is a test notice content.",
        }
        res = self.client.post("/notices/create", json=new_notice)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 201)
        self.assertTrue(data["id"])

        notice_id = data["id"]

        res = self.client.delete(f"/notices/delete/{notice_id}")
        self.assertEqual(res.status_code, 204)

    def test_delete_notice_fail(self):
        non_existing_notice_id = 9999
        res = self.client.delete(f"/notices/delete/{non_existing_notice_id}")
        self.assertEqual(res.status_code, 404)


if __name__ == "__main__":
    unittest.main()
