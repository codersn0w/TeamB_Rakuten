from datetime import datetime
from flask_marshmallow import Marshmallow
from flask_marshmallow.fields import fields
from database import db

ma = Marshmallow()


class MessageModel(db.Model):
    __tablename__ = 'messages'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    sentence = db.Column(db.String(500), nullable=False)
    thread_id = db.Column(db.Integer, db.ForeignKey('threads.id'), nullable=False)
    sender_id = db.Column(db.String(255), nullable=False)
    createTime = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updateTime = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)

    def __init__(self, name):
        # self.id = id
        self.sentence = sentence
        self.thread_id = thread_id
        self.sender_id = sender_id

    def __repr__(self):
        return '<MessageModel {}:{}:{}:{}>'.format(self.id, self.sentence, self.thread_id, self.sender_id)


class MessageSchema(ma.Schema):
    class Meta:
     # 欲しいデータを記述
        fields = ("id", "sentence", "thread_id", "sender_id", "createTime", "updateTime")

    createTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
    updateTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
