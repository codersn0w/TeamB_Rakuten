from flask_seeder import Seeder, Faker, generator
from database import db
from apis.searchBooks import Search_Books_API
import json
import urllib

# SQLAlchemy database model
class Book(db.Model):
  __tablename__ = 'books'
  __table_args__ = {'extend_existing': True}
  def __init__(self, title=None, author=None, genre_id=None, item_caption=None,image_url=None, item_url=None , image=None):
    self.title = title
    self.author = author
    self.genre_id = genre_id
    self.itemCaption = item_caption
    self.image_url = image_url
    self.item_url = item_url
    self.image = image

# All seeders inherit from Seeder
class BookSeeder(Seeder):

  # run() will be called by Flask-Seeder
  def run(self):
      # Create 5 users
    for idx in range(1, 29):
        genre_id = "001"+ format(idx, '03')
        percent = idx*100//28
        print(format(percent, "03") + "%")
        for page in range(1, 100):
            search_books = Search_Books_API(genreId = genre_id, page = page)
            bookList = search_books.get_dict()
            if("Items" in bookList):
                for item in bookList["Items"]:
                    books = Book()
                    books.title = item["Item"]["title"]
                    books.author = item["Item"]["author"]
                    books.genre_id = item["Item"]["booksGenreId"][:6]
                    books.item_caption = item["Item"]["itemCaption"]
                    books.image_url = item["Item"]["mediumImageUrl"]
                    books.item_url = item["Item"]["itemUrl"]
                    self.db.session.add(books)
            
