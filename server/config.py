from flask import Flask
from flask_mysqldb import MySQL
from flask_mail import Mail
from flask_restful import Api
from dotenv import load_dotenv

import os

load_dotenv()

def create_app():
    app = Flask(__name__, static_url_path='/static')

    app.config["MYSQL_HOST"] = os.getenv("MYSQL_HOST")
    app.config["MYSQL_USER"] = os.getenv("MYSQL_USER")
    app.config["MYSQL_PASSWORD"] = os.getenv("MYSQL_PASSWORD")
    app.config["MYSQL_DB"] = os.getenv("MYSQL_DB")
    app.config["MYSQL_CURSORCLASS"] = "DictCursor"

    app.config['MAIL_SERVER']='smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
    app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True

    return app

def init_mysql(app):
    mysql = MySQL(app)
    return mysql

def init_api(app):
    api = Api(app)
    return api

def init_mail(app):
    mail = Mail(app)
    return mail