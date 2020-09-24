from datetime import datetime
from flask_marshmallow import Marshmallow
from flask_marshmallow.fields import fields
from database import db

ma = Marshmallow()


class FollowModel(db.Model):
    __tablename__ = 'follows'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    from_id = db.Column(db.String(255), nullable=False)
    to_id = db.Column(db.String(255), nullable=False)
    createTime = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updateTime = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)

    def __init__(self, from_id, to_id):
        # self.id = id
        self.from_id = from_id
        self.to_id = to_id

    def __repr__(self):
        return '<FollowModel {}:{}:{}>'.format(self.id, self.from_id, self.to_id)


class FollowSchema(ma.Schema):
    class Meta:
     # 欲しいデータを記述
        fields = ("id", "from_id", "to_id", "createTime", "updateTime")

    createTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
    updateTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
