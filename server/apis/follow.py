from flask_restful import Resource, reqparse, abort
from flask import jsonify
from models.follow import FollowModel, FollowSchema
from database import db
import json


class FollowListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('from_id', required=True)
        self.reqparse.add_argument('to_id', required=True)
        super(FollowListAPI, self).__init__()

    def get(self):
        results = FollowModel.query.all()
        jsonData = FollowSchema(many=True).dump(results).data
        # jsonData = json.dumps(results)
        print(results)
        return jsonify({'items': jsonData})

    def post(self):
        args = self.reqparse.parse_args()
        hoge = FollowModel(args.from_id, args.to_id)
        db.session.add(hoge)
        db.session.commit()
        res = FollowSchema().dump(hoge).data
        return res, 201


class FollowAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('from_id')
        self.reqparse.add_argument('to_id')
        super(FollowAPI, self).__init__()

    def get(self, id):
        follow = db.session.query(FollowModel).filter_by(id=id).first()
        if follow is None:
            abort(404)

        res = FollowSchema().dump(follow).data
        return res

    def put(self, id):
        follow = db.session.query(FollowModel).filter_by(id=id).first()
        if follow is None:
            abort(404)
        args = self.reqparse.parse_args()
        for from_id, value in args.items():
            if value is not None:
                setattr(follow, from_id, value)
        db.session.add(follow)
        db.session.commit()
        return None, 204

    def delete(self, id):
        follow = db.session.query(FollowModel).filter_by(id=id).first()
        if follow is not None:
            db.session.delete(follow)
            db.session.commit()
        return None, 204
