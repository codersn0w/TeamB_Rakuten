from flask_seeder import Seeder, Faker, generator
from database import db

# SQLAlchemy database model
class Books(db.Model):
  __tablename__ = 'books'
  __table_args__ = {'extend_existing': True}
  def __init__(self, title=None, author=None, genreId=None,itemCaption=None,mediumImageUrl=None, itemUrl=None ):
    self.title = title
    self.author = author
    self.genreId = genreId
    self.itemCaption = itemCaption
    self.mediumImageUrl = mediumImageUrl
    self.itemUrl = itemUrl

# All seeders inherit from Seeder
class DemoSeeder(Seeder):

  # run() will be called by Flask-Seeder
  def run(self):
      # Create 5 users
    for page in range(1, 100):
        for idx in range(1, 29):
            genreId = "001"+ format(idx, '03')
            search_books = Search_Books_API(genreId = genreId)
            bookList = search_books.get_dict()
            for item in bookList["Items"]:
                books = Books()
                books.title = item["Item"]["title"]
                books.author = item["Item"]["author"]
                books.genreId = item["Item"]["booksGenreId"][:6]
                books.itemCaption = item["Item"]["itemCaption"]
                books.mediumImageUrl = item["Item"]["mediumImageUrl"]
                books.itemUrl = item["Item"]["itemUrl"]
                self.db.session.add(books)
