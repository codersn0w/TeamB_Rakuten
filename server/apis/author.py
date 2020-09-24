from flask_restful import Resource, reqparse, abort
from flask import jsonify
from models.author import AuhtorModel, AuthorSchema
from database import db
import json


class AuthorListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('author', required=True)
        super(AuthorAPI, self).__init__()

    def get(self):
        results = AuthorModel.query.all()
        jsonData = AuthorSchema(many=True).dump(results).data
        return jsonify({'items': jsonData})

    def post(self):
        args = self.reqparse.parse_args()
        author = AuthorModel(args.author)
        db.session.add(author)
        db.session.commit()
        res = AuthorSchema().dump(author).data
        return res, 201


class AuthorAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('author')
        super(AuthorAPI, self).__init__()

    def get(self, id):
        author = db.session.query(AuthorModel).filter_by(id=id).first()
        if author is None:
            abort(404)

        res = AuthorSchema().dump(author).data
        return res

    def put(self, id):
        author = db.session.query(AuthorModel).filter_by(id=id).first()
        if author is None:
            abort(404)
        args = self.reqparse.parse_args()
        for name, value in args.items():
            if value is not None:
                setattr(author, name, value)
        db.session.add(author)
        db.session.commit()
        return None, 204

    def delete(self, id):
        author = db.session.query(AuthorModel).filter_by(id=id).first()
        if author is not None:
            db.session.delete(author)
            db.session.commit()
        return None, 204
