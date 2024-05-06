from flask import request, jsonify
from . import app, db
from .models import EnvironmentalData
from datetime import datetime

@app.route('/data', methods=['POST'])
def receive_data():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()

    try:
        new_data = EnvironmentalData(
            date=datetime.strptime(data['date'], '%Y-%m-%d'),
            city=data['city'],
            temperature=data['temperature'],
            precipitation=data['precipitation'],
            soil_moisture=data['soil_moisture'],
            winds=data['winds']
        )

        db.session.add(new_data)
        db.session.commit()

        return jsonify({"message": "Data added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@app.route('/insert_data')
def insert_data():
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
        return "Data inserted!"
    return "Data already exists."


@app.route('/all_data', methods=['GET'])
def get_all_data():
    try:
        all_data = EnvironmentalData.query.all()
        data_list = []
        for data in all_data:
            data_dict = {
                'date': data.date.strftime('%Y-%m-%d'),
                'city': data.city,
                'temperature': data.temperature,
                'precipitation': data.precipitation,
                'soil_moisture': data.soil_moisture,
                'winds': data.winds
            }
            data_list.append(data_dict)
        
        return jsonify({"data": data_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
