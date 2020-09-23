from datetime import datetime
from flask_marshmallow import Marshmallow
from flask_marshmallow.fields import fields
from ..database import db

ma = Marshmallow()


class BookRentalModel(db.Model):
    __tablename__ = 'bookrental'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    book_id = db.Column(db.Integer, nullable=False)
    request_id = db.Column(db.Integer)
    state = db.Column(db.Integer)
    loan_started_date = db.Column(db.DateTime)

    def __init__(self, user_id, book_id):
        # self.id = id
        self.user_id = user_id
        # self.loan_user_id = loan_user_id
        self.book_id = book_id

    def __repr__(self):
        return '<BookRentalModel {}:{}:{}>'.format(self.id, self.user_id, self.book_id)


class BookRentalSchema(ma.Schema):
    class Meta:
     # 欲しいデータを記述
        fields = ("id", "user_id", "request_id",
                  "book_id", "state", "loan_started_date")

    # createTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
    # updateTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
