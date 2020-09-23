from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_seeder import FlaskSeeder

db = SQLAlchemy()


def init_db(app):
    db.init_app(app)
    Migrate(app, db)
    seeder = FlaskSeeder()
    seeder.init_app(app, db)
