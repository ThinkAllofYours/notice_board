from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
import pytz

db = SQLAlchemy()
migrate = Migrate()

"""
binds a flask application and a SQLAlchemy service
"""


def setup_db(app):
    with app.app_context():
        db.init_app(app)
        migrate.init_app(app, db)
        db.create_all()


class BaseModel(db.Model):
    __abstract__ = True

    def __init__(self):
        pass

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        raise NotImplementedError


class Notice(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    author_name = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    views_count = db.Column(db.Integer, nullable=False)
    recommends_count = db.Column(db.Integer, nullable=False)
    not_recommends_count = db.Column(db.Integer, nullable=False)
    created_date = db.Column(db.DateTime, nullable=False)
    updated_date = db.Column(db.DateTime, nullable=False)
    prev_id = db.Column(db.Integer, nullable=True)
    next_id = db.Column(db.Integer, nullable=True)

    def __init__(
        self,
        author_name,
        title,
        content,
        views_count,
        recommends_count,
        not_recommends_count,
        created_date,
        updated_date,
        prev_id,
        next_id,
    ):
        self.author_name = author_name
        self.title = title
        self.content = content
        self.views_count = views_count
        self.recommends_count = recommends_count
        self.not_recommends_count = not_recommends_count
        self.created_date = created_date
        self.updated_date = updated_date
        self.prev_id = prev_id
        self.next_id = next_id

    def __repr__(self):
        return f"<Notice {self.title}>"

    def format_for_list(self):
        return {
            "id":self.id,
            "title": self.title,
            "views_count":self.views_count,
            "recommends_count":self.recommends_count,
            "not_recommends_count": self.not_recommends_count,
            "created_date":self.created_date,
            "prev_id":self.prev_id,
            "next_id":self.next_id
        }
