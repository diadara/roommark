from flask import Flask
from flask_bootstrap import Bootstrap
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.httpauth import HTTPBasicAuth

app = Flask(__name__)
app.config.from_object('config')
Bootstrap(app)
db = SQLAlchemy(app)
auth = HTTPBasicAuth()

from app import views, model
