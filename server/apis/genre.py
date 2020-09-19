from flask_restful import Resource, reqparse, abort

from flask import jsonify

from models.genre import GenreModel, GenreSchema

from database import db

class GenreAPI(Resource):
  def __init__(self):
    self.reqparse = reqparse.RequestParser()
    #self.reqparse.add_argument('name')
    #self.reqparse.add_argument('state')
    super(GenreAPI, self).__init__()


  def get(self, id):
    genre = db.session.query(GenreModel).filter_by(id=id).first()
    if genre is None:
      abort(404)

    res = GenreSchema().dump(genre).data
    return res


  def put(self, id):
    genre = db.session.query(GenreModel).filter_by(id=id).first()
    if genre is None:
      abort(404)
    args = self.reqparse.parse_args()
    for name, value in args.items():
      if value is not None:
        setattr(genre, name, value)
    db.session.add(genre)
    db.session.commit()
    return None, 204


  def delete(self, id):
    genre = db.session.query(GenreModel).filter_by(id=id).first()
    if genre is not None:
      db.session.delete(genre)
      db.session.commit()
    return None, 204
