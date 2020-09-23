from datetime import datetime
from flask_marshmallow import Marshmallow
from flask_marshmallow.fields import fields
from sqlalchemy_utils import *
# from sqlalchemy_utils import UUIDType
from ..database import db
import uuid

ma = Marshmallow()


class HogeModel(db.Model):
    __tablename__ = 'hoges'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer,
                   primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)

    createTime = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updateTime = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)

    def __init__(self, name, state):
        self.name = name
        self.state = state

    def __repr__(self):
        return '<HogeModel {}:{}>'.format(self.id, self.name)


class HogeSchema(ma.Schema):
    class Meta:
        # 欲しいデータを記述
        fields = ("id", "name", "state")

    createTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
    updateTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
