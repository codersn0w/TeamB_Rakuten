from flask_seeder import Seeder, Faker, generator
from database import db

# SQLAlchemy database model
class Genre(db.Model):
  __tablename__ = 'genres'
  __table_args__ = {'extend_existing': True}
  def __init__(self, id=None, name=None):
    self.id = id
    self.name = name

  def __str__(self):
    return "ID=%s, Name=%s" % (self.id, self.name)

# All seeders inherit from Seeder
class DemoSeeder(Seeder):

  # run() will be called by Flask-Seeder
  def run(self):
    # Create a new Faker and tell it how to create User objects
      seedlist = [{
         "id": "001001",
         "name": "漫画（コミック）",
        },
       {
         "id": "001002",
         "name": "語学・学習参考書",
        },
       {
         "id": "001003",
         "name": "絵本・児童書・図鑑",
        },
       {
         "id": "001004",
         "name": "小説・エッセイ",
        },
       {
         "id": "001005",
         "name": "パソコン・システム開発",
        },
       {
         "id": "001006",
         "name": "ビジネス・経済・就職",
        },
       {
         "id": "001007",
         "name": "旅行・留学・アウトドア",
        },
       {
         "id": "001008",
         "name": "人文・思想・社会",
        },
       {
         "id": "001009",
         "name": "ホビー・スポーツ・美術",
        },
       {
         "id": "001010",
         "name": "美容・暮らし・健康・料理",
        },
       {
         "id": "001011",
         "name":  "エンタメ・ゲーム",
        },
       {
         "id": "001012",
         "name": "科学・技術",
        },
       {
         "id": "001013",
         "name": "写真集・タレント",
        },
       {
         "id": "001016",
         "name": "資格・検定",
        },
       {
         "id": "001018",
         "name": "楽譜",
        },
       {
         "id": "001019",
         "name": "文庫",
        },
       {
         "id": "001020",
         "name": "新書",
        },
       {
         "id": "001021",
         "name": "ボーイズラブ（BL）",
        },
       {
         "id": "001022",
         "name": "付録付き",
        },
       {
         "id": "001025",
         "name": "セット本",
        },
       {
         "id": "001026",
         "name": "カレンダー・手帳・家計簿",
        },
       {
         "id": "001027",
         "name": "文具・雑貨",
        },
       {
         "id": "001028",
         "name": "医学・薬学・看護学・歯科学",
        },
      ]

      # Create 5 users
      for g in seedlist:
        #print("Adding Genre: %s" % genre)
        genre = Genre()
        genre.id = g["id"]
        genre.name = g["name"]
        self.db.session.add(genre)