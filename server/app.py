from flask import Flask, jsonify
from flask_restful import Api
from database import init_db
#from apis.hoge import HogeListAPI, HogeAPI
from apis.genre import GenreListAPI, GenreAPI
from apis.thread import ThreadListAPI, GetThreadListAPI, GetThreadListAPI2, ThreadAPI
from apis.message import MessageListAPI, GetMessageListAPI, MessageAPI
from apis.notification import NotificationListAPI, NotificationAPI
from apis.follow import FollowListAPI, FollowAPI
from apis.book import BookListAPI, BookAPI, GetBookListAPI
from apis.bookrental import BookRentalListAPI, BookRentalAPI
from apis.author import AuthorListAPI, AuthorAPI
from config import Config


def create_app():

    app = Flask(__name__)
    app.config.from_object(Config)

    init_db(app)

    api = Api(app)
    #api.add_resource(HogeListAPI, '/hoges')
    #api.add_resource(HogeAPI, '/hoges/<id>')
    api.add_resource(GenreListAPI, '/genres')

    api.add_resource(GenreAPI, '/genres/<id>')
    api.add_resource(ThreadListAPI, '/threads')
    api.add_resource(GetThreadListAPI, '/threads/genre_id/<genre_id>')
    api.add_resource(GetThreadListAPI2, '/threads/book_id/<book_id>')
    api.add_resource(ThreadAPI, '/thread/<id>')
    api.add_resource(MessageListAPI, '/messages')
    api.add_resource(GetMessageListAPI, '/messages/<thread_id>')
    api.add_resource(MessageAPI, '/message/<id>')
    api.add_resource(NotificationListAPI, '/notifications')
    api.add_resource(NotificationAPI, '/notification/<id>')
    api.add_resource(FollowListAPI, '/follows')
    api.add_resource(FollowAPI, '/follow/<id>')
    api.add_resource(BookRentalListAPI, '/bookrentals')
    api.add_resource(BookRentalAPI, '/bookrentals/<id>')
    api.add_resource(AuthorListAPI, '/authors')
    api.add_resource(AuthorAPI, '/author/<id>')
    api.add_resource(BookListAPI, '/books')
    api.add_resource(BookAPI, '/book/<id>')
    api.add_resource(GetBookListAPI, '/books/<title>')

    return app


app = create_app()
