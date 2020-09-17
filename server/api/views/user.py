from flask import Blueprint, request, make_response, jsonify

# ルーティング設定
user_router = Blueprint('user_router', __name__)

# パスとHTTPメソッドを指定
@user_router.route('/users', methods=['GET'])
def get_user_list():

  return make_response(jsonify({
    'users': [
       {
         'id': 1,
         'name': 'John'
       }
     ]
  }))