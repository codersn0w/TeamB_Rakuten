import urllib
import json
import requests

class Search_Books_API():
    DEV_ID = "1014208003770171209"
    AFF_ID = "1d0d8e01.0c225899.1d0d8e02.e43712a3"
    BASE_URI = "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?"
    HITS = 10

    def __init__(self, keyword, title=None, author=None, genreID=None, sort=None):
        self.keyword = keyword
        self.title = title
        self.author = author
        self.genreID = genreID
        self.sort = sort

    def create_query(self):
        query = {}
        query['keyword'] = self.keyword
        query['applicationId'] = self.DEV_ID
        query['affiliateId'] = self.AFF_ID
        query['title'] = self.title
        query['author'] = self.author
        query['booksGenreId'] = self.genreID
        query['sort'] = self.sort
        query['hits'] = self.HITS
        
        #include search info
        #query['elements'] = "count,page,first,last,title,author,publisherName,isbn,itemUrl,mediumImageUrl,booksGenreId,booksGenreName"
        query['elements'] = "title, author, itemUrl, booksGenreID"
        return query
    
    def get_dict(self):
        query = self.create_query()
        res = requests.get(self.BASE_URI, params=query)
        return res.json()
    
    def get(self):
        res=self.get_dict()
        return json.dumps(res, sort_keys = True, indent = 4)


