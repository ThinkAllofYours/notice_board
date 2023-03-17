import requests
import os
from datetime import datetime
from pybo import create_app
from pybo.database.models import Notice, db
from sqlalchemy import select

def setup_db():
    """Define database"""
    app = create_app()
    notice_data = fetch_notice_data()
    insert_notice_data(app, notice_data)
    print("===============all done==============")


def fetch_notice_data():
    url = "https://api.udacitypartner.com/api/v1/information/notice/"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return data["data"]
    else:
        print(f"Error: {response.status_code}")
        return None


def parse_date(date_string):
    try:
        return datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%S.%f")
    except ValueError:
        return datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%S")

def clear_notice_data(app, notice_data):
    with app.app_context():
        for notice in notice_data:
            notice.delete()

def insert_notice_data(app, notice_data):
    with app.app_context():
        for notice in notice_data:
            new_notice = Notice(
                author_name=notice["authorName"],
                title=notice["title"],
                content=notice["content"],
                views_count=notice["viewsCount"],
                recommends_count=notice["recommendsCount"],
                not_recommends_count=notice["notRecommendsCount"],
                created_date=parse_date(notice["createdDate"]),
                updated_date=parse_date(notice["updatedDate"]),
                prev_id=notice["prevId"],
                next_id=notice["nextId"],
            )
            new_notice.insert()


"""run setup_db"""
setup_db()
