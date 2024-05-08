from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import date, timedelta
import random
from config import Config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app.models import EnvironmentalData
from app import routes

def insert_initial_data(num_entries=500):
    with app.app_context():
        cities = ["Springfield", "Riverdale", "Shelbyville", "Metropolis", "Gotham"]
        data_list = []
        
        for _ in range(num_entries):
            city = random.choice(cities)
            temperature = random.randint(-10, 35)  # temperatures between -10°C and 35°C
            precipitation = random.random() * 100  # precipitation between 0 and 100 mm
            soil_moisture = random.randint(0, 100)  # soil moisture percentage
            winds = random.random() * 100  # wind speed in km/h

            new_data = EnvironmentalData(
                date=date.today() - timedelta(days=random.randint(0, 365)),  # random date within the last year
                city=city,
                temperature=str(temperature),
                precipitation=str(precipitation),
                soil_moisture=str(soil_moisture),
                winds=str(winds)
            )
            data_list.append(new_data)

        db.session.bulk_save_objects(data_list)
        db.session.commit()
        print(f"{num_entries} entries of random data inserted!")

insert_initial_data()  # Generate and insert 1000 entries by default

if __name__ == '__main__':
    app.run()
