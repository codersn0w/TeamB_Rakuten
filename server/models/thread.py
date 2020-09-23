from datetime import datetime
from flask_marshmallow import Marshmallow
from flask_marshmallow.fields import fields
from database import db

ma = Marshmallow()


class ThreadModel(db.Model):
    __tablename__ = 'threads'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    genre_id = db.Column(db.String(10), db.ForeignKey('genres.id'), nullable=False)
    book_id = db.Column(db.String(255), nullable=True)
    #book_id = db.Column(db.String(255), nullable=True, ForeignKey('books.id'))
    createTime = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updateTime = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)
    message = db.relationship("MessageModel")

    def __init__(self, name, genre_id, book_id):
        # self.id = id
        self.name = name
        self.genre_id = genre_id
        self.book_id = book_id

    def __repr__(self):
        return '<ThreadModel {}:{}:{}:{}>'.format(self.id, self.name, self.genre_id, self.book_id)


class ThreadSchema(ma.Schema):
    class Meta:
     # 欲しいデータを記述
        fields = ("id", "name", "genre_id", "book_id", "createTime", "updateTime")

    createTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
    updateTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
