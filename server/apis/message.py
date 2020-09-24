from flask_restful import Resource, reqparse, abort
from flask import jsonify
from models.message import MessageModel, MessageSchema
from database import db
import json


class MessageListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('sentence', required=True)
        self.reqparse.add_argument('thread_id', required=True)
        self.reqparse.add_argument('sender_id', required=True)
        super(MessageListAPI, self).__init__()

    def post(self):
        args = self.reqparse.parse_args()
        hoge = MessageModel(args.sentence, args.thread_id, args.sender_id)
        db.session.add(hoge)
        db.session.commit()
        res = MessageSchema().dump(hoge).data
        return res, 201

class GetMessageListAPI(Resource):
    def get(self, thread_id):
        results = MessageModel.query.filter_by(thread_id=thread_id).all()
        jsonData = MessageSchema(many=True).dump(results).data
        #jsonData = json.dumps(results)
        # print(results)
        return jsonify({'items': jsonData})

class MessageAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('sentence')
        self.reqparse.add_argument('thread_id')
        self.reqparse.add_argument('sender_id')
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
