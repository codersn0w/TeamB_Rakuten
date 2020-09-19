from datetime import datetime

from flask_marshmallow import Marshmallow

from flask_marshmallow.fields import fields

from sqlalchemy_utils import UUIDType

from database import db

ma = Marshmallow()


class GenreModel(db.Model):
  __tablename__ = 'genres'
  __table_args__ = {'extend_existing': True}
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  createTime = db.Column(db.DateTime, nullable=False, default=datetime.now)
  updateTime = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

  def __init__(self, id, name):
    self.id = id
    self.name = name


  def __repr__(self):
    return '<GenreModel {}:{}>'.format(self.id, self.name)


class GenreSchema(ma.Schema):
  class Meta:
    model = GenreModel

  createTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
  updateTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')