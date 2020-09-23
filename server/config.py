class DevelopmentConfig:

    # SQLAlchemy
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{database}?charset=utf8'.format(
        **{
            'user': 'root',
            'password': 'hoge',
            'host': '192.168.33.10:3306',
            'database': 'hoge',
        })
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False


Config = DevelopmentConfig
