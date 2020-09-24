from flask import Flask, jsonify
from flask_restful import Api
from database import init_db
#from apis.hoge import HogeListAPI, HogeAPI
from apis.genre import GenreListAPI, GenreAPI
from apis.thread import ThreadListAPI, ThreadAPI
from apis.message import MessageListAPI, MessageAPI
from apis.notification import NotificationListAPI, NotificationAPI
from apis.follow import FollowListAPI, FollowAPI
from apis.book import BookListAPI, BookAPI
from apis.bookrental import BookRentalListAPI, BookRentalAPI
from config import Config
from flask_cors import CORS


def create_app():

    app = Flask(__name__)
    cors = CORS(app, resources={r"*": {"origins": "*"}})
    app.config.from_object(Config)

    init_db(app)

    api = Api(app)
    #api.add_resource(HogeListAPI, '/hoges')
    #api.add_resource(HogeAPI, '/hoges/<id>')
    api.add_resource(GenreListAPI, '/genres')

    api.add_resource(GenreAPI, '/genres/<id>')
    api.add_resource(ThreadListAPI, '/threads')
    api.add_resource(ThreadAPI, '/threads/<id>')
    api.add_resource(MessageListAPI, '/messages')
    api.add_resource(MessageAPI, '/message/<id>')
    api.add_resource(NotificationListAPI, '/notifications')
    api.add_resource(NotificationAPI, '/notification/<id>')
    api.add_resource(FollowListAPI, '/follows')
    api.add_resource(FollowAPI, '/follow/<id>')
    api.add_resource(BookRentalListAPI, '/bookrentals')
    api.add_resource(BookRentalAPI, '/bookrentals/<id>')

    return app


app = create_app()
