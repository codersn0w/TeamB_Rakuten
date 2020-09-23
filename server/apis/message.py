from flask_restful import Resource, reqparse, abort
from flask import jsonify
from models.message import MessageModel, MessageSchema
from database import db
import json


class MessageListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('sentence', required=True)
        # self.reqparse.add_argument('state', required=True)
        super(MessageListAPI, self).__init__()

    def get(self):
        results = MessageModel.query.all()
        jsonData = MessageSchema(many=True).dump(results).data
        #jsonData = json.dumps(results)
        #print(results)
        return jsonify({'items': jsonData})

    def post(self):
        args = self.reqparse.parse_args()
        hoge = MessageModel(args.sentence)
        db.session.add(hoge)
        db.session.commit()
        res = MessageSchema().dump(hoge).data
        return res, 201


class MessageAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('sentence')
        # self.reqparse.add_argument('state')
        super(MessageAPI, self).__init__()

    def get(self, id):
        message = db.session.query(MessageModel).filter_by(id=id).first()
        if message is None:
            abort(404)

        res = MessageSchema().dump(message).data
        return res

    def put(self, id):
        message = db.session.query(MessageModel).filter_by(id=id).first()
        if message is None:
            abort(404)
        args = self.reqparse.parse_args()
        for sentence, value in args.items():
            if value is not None:
                setattr(message, sentence, value)
        db.session.add(message)
        db.session.commit()
        return None, 204

    def delete(self, id):
        message = db.session.query(MessageModel).filter_by(id=id).first()
        if message is not None:
            db.session.delete(message)
            db.session.commit()
        return None, 204
