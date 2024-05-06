import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'a default secret key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://user:password@db/yourdbname')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
