import urllib
import json
import requests


class Search_Books_API():
    DEV_ID = "1014208003770171209"
    AFF_ID = "1d0d8e01.0c225899.1d0d8e02.e43712a3"
    BASE_URI = "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?"
    HITS = 30

    def __init__(self, keyword=None, title=None, author=None, genreId=None, sort=None, page=None):
        self.keyword = keyword
        self.title = title
        self.author = author
        self.genreId = genreId
        self.sort = sort
        self.page = page

    def create_query(self):
        query = {}
        query['keyword'] = self.keyword
        query['applicationId'] = self.DEV_ID
        query['affiliateId'] = self.AFF_ID
        query['title'] = self.title
        query['author'] = self.author
        query['booksGenreId'] = self.genreId
        query['sort'] = self.sort
        query['hits'] = self.HITS
        query['page'] = self.page

        # query['elements'] = "count,page,first,last,title,author,publisherName,isbn,itemUrl,mediumImageUrl,booksGenreId,booksGenreName"
        query['elements'] = "title,author,booksGenreId,itemCaption,mediumImageUrl,itemUrl"
        return query

    def get_dict(self):
        query = self.create_query()
        res = requests.get(self.BASE_URI, params=query)
        return res.json()

    def get(self):
        res=self.get_dict()
        return json.dumps(res, sort_keys = True, indent = 4)

    def get_array(self):
        res = self.get_dict()
        res_list = [[val for val in item["Item"].values()]
                    for item in res["Items"]]
        return res_list
