from flask_restful import Resource, reqparse, abort
from flask import jsonify
from models.notification import NotificationModel, NotificationSchema
from database import db
import json


class NotificationListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('user_id', required=True)
        self.reqparse.add_argument('desc', required=True)
        self.reqparse.add_argument('type', required=True)
        self.reqparse.add_argument('img', required=True)
        super(NotificationListAPI, self).__init__()

    def get(self):
        results = NotificationModel.query.all()
        jsonData = NotificationSchema(many=True).dump(results).data
        #jsonData = json.dumps(results)
        #print(results)
        return jsonify({'items': jsonData})

    def post(self):
        args = self.reqparse.parse_args()
        hoge = NotificationModel(args.user_id, args.desc, args.type, args.img)
        db.session.add(hoge)
        db.session.commit()
        res = NotificationSchema().dump(hoge).data
        return res, 201


class NotificationAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('user_id')
        self.reqparse.add_argument('desc')
        self.reqparse.add_argument('type')
        self.reqparse.add_argument('img')
        super(NotificationAPI, self).__init__()

    def get(self, id):
        notification = db.session.query(NotificationModel).filter_by(id=id).first()
        if notification is None:
            abort(404)

        res = NotificationSchema().dump(notification).data
        return res

    def put(self, id):
        notification = db.session.query(NotificationModel).filter_by(id=id).first()
        if notification is None:
            abort(404)
        args = self.reqparse.parse_args()
        for desc, value in args.items():
            if value is not None:
                setattr(notification, desc, value)
        db.session.add(notification)
        db.session.commit()
        return None, 204

    def delete(self, id):
        notification = db.session.query(NotificationModel).filter_by(id=id).first()
        if notification is not None:
            db.session.delete(notification)
            db.session.commit()
        return None, 204
