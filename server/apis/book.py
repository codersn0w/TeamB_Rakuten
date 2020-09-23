from flask_restful import Resource, reqparse, abort
from flask import jsonify
from models.book import BookModel, BookSchema
from database import db
import json


class BookListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', required=True)
        self.reqparse.add_argument('author', required=True)
        super(BookListAPI, self).__init__()

    def get(self):
        results = BookModel.query.all()
        jsonData = BookSchema(many=True).dump(results).data
        return jsonify({'items': jsonData})

    def post(self):
        args = self.reqparse.parse_args()
        book = BookModel(args.title, args.author)
        db.session.add(book)
        db.session.commit()
        res = BookSchema().dump(book).data
        return res, 201


class BookAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title')
        self.reqparse.add_argument('author')
        super(BookAPI, self).__init__()

    def get(self, id):
        book = db.session.query(BookModel).filter_by(id=id).first()
        if book is None:
            abort(404)

        res = BookSchema().dump(book).data
        return res

    def put(self, id):
        book = db.session.query(BookModel).filter_by(id=id).first()
        if book is None:
            abort(404)
        args = self.reqparse.parse_args()
        for name, value in args.items():
            if value is not None:
                setattr(book, name, value)
        db.session.add(book)
        db.session.commit()
        return None, 204

    def delete(self, id):
        book = db.session.query(BookModel).filter_by(id=id).first()
        if book is not None:
            db.session.delete(book)
            db.session.commit()
        return None, 204
