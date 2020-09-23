from flask_restful import Resource, reqparse, abort
from flask import jsonify
from ..models.bookrental import BookRentalModel, BookRentalSchema
from ..database import db
import json


class BookRentalListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('rent_user_id', required=True)
        self.reqparse.add_argument('book_id', required=True)
        super(BookRentalListAPI, self).__init__()

    def get(self):
        results = BookRentalModel.query.all()
        jsonData = BookRentalSchema(many=True).dump(results).data
        # jsonData = json.dumps(results)
        # print(results)
        return jsonify({'items': jsonData})

    def post(self):
        args = self.reqparse.parse_args()
        hoge = BookRentalModel(
            args.rent_user_id, args.book_id)
        db.session.add(hoge)
        db.session.commit()
        res = BookRentalSchema().dump(hoge).data
        return res, 201


class BookRentalAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        # 更新した項目を追加
        self.reqparse.add_argument('user_id')
        self.reqparse.add_argument('book_id')
        self.reqparse.add_argument('state')
        self.reqparse.add_argument('loan_started_date')
        self.reqparse.add_argument("request_id")
        super(BookRentalAPI, self).__init__()

    def get(self, id):
        message = db.session.query(BookRentalModel).filter_by(id=id).first()
        if message is None:
            abort(404)

        res = BookRentalSchema().dump(message).data
        return res

    def put(self, id):
        message = db.session.query(BookRentalModel).filter_by(id=id).first()
        if message is None:
            abort(404)
        args = self.reqparse.parse_args()
        for user_id, value in args.items():
            if value is not None:
                setattr(message, user_id, value)
        db.session.add(message)
        db.session.commit()
        return None, 204

    def delete(self, id):
        message = db.session.query(BookRentalModel).filter_by(id=id).first()
        if message is not None:
            db.session.delete(message)
            db.session.commit()
        return None, 204
