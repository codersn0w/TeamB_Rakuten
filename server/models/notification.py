from datetime import datetime
from flask_marshmallow import Marshmallow
from flask_marshmallow.fields import fields
from database import db

ma = Marshmallow()


class NotificationModel(db.Model):
    __tablename__ = 'notifications'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.String(255), nullable=False)
    desc = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(255), nullable=False)
    img = db.Column(db.String(255), nullable=False)
    createTime = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updateTime = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)

    def __init__(self, user_id, desc, type, img):
        # self.id = id
        self.user_id = user_id
        self.desc = desc
        self.type = type
        self.img = img

    def __repr__(self):
        return '<NotificationModel {}:{}:{}:{}:{}>'.format(self.id, self.user_id, self.desc, self.type, self.img)


class NotificationSchema(ma.Schema):
    class Meta:
     # 欲しいデータを記述
        fields = ("id", "user_id", "desc", "type", "img", "createTime", "updateTime")

    createTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
    updateTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
