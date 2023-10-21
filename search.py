from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample parking facility data (you would typically store this in a database)
parking_facilities = [
    {
        "id": 1,
        "name": "Downtown Parking Garage",
        "location": "123 Main St, City",
        "capacity": 100,
        "available_spaces": 30,
    },
    {
        "id": 2,
        "name": "Central Plaza Parking Lot",
        "location": "456 Elm St, City",
        "capacity": 50,
        "available_spaces": 10,
    },
]

# Search for parking facilities
@app.route('/search', methods=['GET'])
def search_parking():
    query = request.args.get('query', '').lower()
    results = []

    for facility in parking_facilities:
        if query in facility['name'].lower() or query in facility['location'].lower():
            results.append(facility)

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
