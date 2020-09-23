class DevelopmentConfig:

  # SQLAlchemy
  SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{database}?charset=utf8'.format(
    **{
      'user': 'root',
      'password': 'hoge',
      'host': 'db',
      'database': 'hoge',
    })
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_ECHO = False


Config = DevelopmentConfig
