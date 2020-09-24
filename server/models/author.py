from flask_marshmallow import Marshmallow
from flask_marshmallow.fields import fields
from database import db

ma = Marshmallow()


class AuthorModel(db.Model):
    __tablename__ = 'authors'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    author = db.Column(db.String(255), nullable=False)
    #book_ids = db.Column(db.Integer, nullable=False, db.ForeignKey('books.id') )

    def __init__(self, author):
        self.author = author

    def __repr__(self):
        return '<ThreadModel {}:{}:{}:{}>'.format(self.id, self.author)


class AuthorSchema(ma.Schema):
    class Meta:
     # 欲しいデータを記述
        fields = ("id", "author")
