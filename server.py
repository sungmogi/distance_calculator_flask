from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return 'Hello'

@app.route('/calculate', methods=['POST'])
def get_distance():
    data = request.json
    startingPoint = data.get('startingPoint')
    destination = data.get('destination')
    api_key = '[YOUR_API_KEY]'

    endpoint_url = f"https://maps.googleapis.com/maps/api/distancematrix/json?destinations={destination}&origins={startingPoint}&key={api_key}"

    response = requests.get(endpoint_url)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
