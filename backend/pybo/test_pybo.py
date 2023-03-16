import unittest
import json
from database.models import Notice, Answer, Question
from pybo import create_app


class PyboTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setup(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client()

    def tearDown(self):
        """Excute after reach test"""
        pass

    """test models"""

    def test_get_notices(self):
        res = self.client.get("/notices?page=1")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
