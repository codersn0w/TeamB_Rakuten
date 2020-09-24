from flask_restful import Resource, reqparse, abort
from flask import jsonify
from models.thread import ThreadModel, ThreadSchema
from database import db
import json


class ThreadListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name', required=True)
        self.reqparse.add_argument('genre_id', required=True)
        self.reqparse.add_argument('book_id')
        # self.reqparse.add_argument('state', required=True)
        super(ThreadListAPI, self).__init__()

    def get(self):
        results = ThreadModel.query.all()
        jsonData = ThreadSchema(many=True).dump(results).data
        # jsonData = json.dumps(results)
        print(results)
        return jsonify({'items': jsonData})

    def post(self):
        args = self.reqparse.parse_args()
        hoge = ThreadModel(args.name, args.genre_id, args.book_id)
        db.session.add(hoge)
        db.session.commit()
        res = ThreadSchema().dump(hoge).data
        return res, 201


class ThreadAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name')
        self.reqparse.add_argument('genre_id')
        self.reqparse.add_argument('book_id')
        # self.reqparse.add_argument('state')
        super(ThreadAPI, self).__init__()

    def get(self, id):
        thread = db.session.query(ThreadModel).filter_by(id=id).first()
        if thread is None:
            abort(404)

        res = ThreadSchema().dump(thread).data
        return res

    def put(self, id):
        thread = db.session.query(ThreadModel).filter_by(id=id).first()
        if thread is None:
            abort(404)
        args = self.reqparse.parse_args()
        for name, value in args.items():
            if value is not None:
                setattr(thread, name, value)
        db.session.add(thread)
        db.session.commit()
        return None, 204

    def delete(self, id):
        thread = db.session.query(ThreadModel).filter_by(id=id).first()
        if thread is not None:
            db.session.delete(thread)
            db.session.commit()
        return None, 204
