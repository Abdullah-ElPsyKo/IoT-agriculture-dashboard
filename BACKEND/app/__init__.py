from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import date
from config import Config
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
app.config.from_object(Config)

# Initialize CORS
CORS(app)  # Allow CORS for all origins

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import models and routes after the app and db are set up
from app.models import EnvironmentalData
from app import routes

def insert_initial_data():
    with app.app_context():  # Ensure that this function runs within an app context
        if not EnvironmentalData.query.first():
            test_data = EnvironmentalData(
                date=date.today(),
                city="Test City",
                temperature="25",
                precipitation="0",
                soil_moisture="10",
                winds="5"
            )
            db.session.add(test_data)
            db.session.commit()
            print("Initial data inserted!")

insert_initial_data()  # Call this function after db setup

if __name__ == '__main__':
    app.run()
