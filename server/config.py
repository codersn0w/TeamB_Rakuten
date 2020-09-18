class SystemConfig:

  DEBUG = True

  SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(**{
      'user': 'root',
      'password': 'hoge',
      'host': 'db',
      'db_name': 'hoge'
  })

Config = SystemConfig