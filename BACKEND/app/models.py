from . import db

class EnvironmentalData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    city = db.Column(db.String(80), nullable=False)
    temperature = db.Column(db.String(20), nullable=False)
    precipitation = db.Column(db.String(20), nullable=False)
    soil_moisture = db.Column(db.String(20), nullable=False)
    winds = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f'<EnvironmentalData {self.city}>'
