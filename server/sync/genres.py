import requests

# url = 'https: // app.rakuten.co.jp/services/api/BooksGenre/Search/20121128?applicationId = [1014208003770171209] & booksGenreId = 001'

# r = requests.get(url)
# resp = r.json()
# print(resp)


def kick_rakten_api():

    REQUEST_URL = "https://app.rakuten.co.jp/services/api/BooksGenre/Search/20121128"

    # パラメーター生成
    search_param = set_api_parameter()
    # Get
    response = requests.get(REQUEST_URL, search_param)
    # APIから返却された出力パラメーターを取得
    result = response.json()

    # 確認のために出力
    print(result)
    #
    # item = result["Items"][0]["Item"]
    # print(item["itemPrice"])


def set_api_parameter():
    app_id = 1014208003770171209
    parameter = {
        "format": "json", "keyword": "4562344360869", "applicationId": [app_id], "availability": 1, "hits": 1, "sort": "+itemPrice"
    }
    return parameter


kick_rakten_api()
