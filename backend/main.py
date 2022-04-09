from flask import Flask, request, jsonify
from algos import Algos
from utils.adress_parser import get_address
import pymongo
app = Flask(__name__)
db = None


@app.route("/api/locations", methods=["POST"])
def get_numerical_locations():
    pass


@app.route("/api/result")
def get_chargers():
    app.logger.info("=== Test Log ===")
    return {"result": "Mondry wynik algorytmu Victora xD"}


@app.route("/api/brands", methods=["GET"])
def get_brands():
    car_brands = db.get_collection('carsElectric').distinct('Brand')
    return jsonify(process_brands(car_brands)), 200


@app.route("/api/carbody")
def get_carbody():
    car_body = db.get_collection('carsElectric').distinct('BodyStyle')
    return jsonify(car_body)


def process_brands(car_brands: list):
    unique_brands = list()
    for brand in car_brands:
        splitted = brand.split(" ")
        unique_brands.append(splitted[0].lower())
    return list(set(unique_brands))


@app.route("/api/form/carForm", methods=["POST"])
def post_user_answers():
    if not request.method == "POST":
        return
    app.logger.info(request.data)
    received = request.json
    if received["userAddress"]["country"] in ("Polska", "polska"):
        chargers_country = "polandRealChargers"
    else:
        chargers_country = "germanyRealChargers"
    try:
        chargers = get_charging_points(chargers_country)
    except (StopIteration):
        app.logger.info("Invalid Country - 400")
        return "Invalid Country", 400
    brands = db.get_collection('carsElectric').distinct('Brand')
    cars = get_cars()
    cars = list(cars)
    brands = process_brands(brands)
    address = get_address(
        received["userAddress"]["name"],
        received["userAddress"]["num"],
        received["userAddress"]["city"],
        received["userAddress"]["country"])
    destinations = list()
    destinations.append(address)
    if not received["destAddress"] == []:
        for address in received["destAddress"]:
            temp = get_address(
                address["name"],
                address["num"],
                address["city"],
                address["country"])
            destinations.append(temp)
    rating = get_rating(received, chargers, brands, cars, destinations)
    top_cars = rating.find_best_car()[0:3]
    score = rating.get_result()
    app.logger.info(f"Counted score: {score}")
    return {"score": round(score*100, 2),
            "best_cars": {
                1: top_cars[0],
                2: top_cars[1],
                3: top_cars[2]
            }}, 200


def get_charging_points(chargers_country):
    chargers = db.get_collection(chargers_country).aggregate([
            {'$group': {
                '_id': None,
                'loc': {'$push': {'$function': {
                    'body': 'function(la, lg) {return [la, lg]}',
                    'args': ['$latitude', '$longitude'],
                    'lang': 'js',
                        }}}
            }}
        ]).next()['loc']

    return list(chargers)


def get_cars():
    cars = db.get_collection('carsElectric').find({}, {
                    '_id': 0,
                    'Brand': 1,
                    'Model': 1,
                    'BodyStyle': 1,
                    'Range_Km': 1,
                    'PriceEuro': 1,
                    'AccelSec': 1,
                    'TopSpeed_KmH': 1
                })
    return cars


def get_rating(received, chargers, brands, cars, destinations):
    if received["maxDistance"] == "":
        received["maxDistance"] = 2
    if received["photovoltaics"] == "":
        received["photovoltaics"] = False

    params = [
        received["price"],
        chargers,
        destinations,   # always is address given
        brands,
        cars,
        received["km"],
        int(received["days"]),
        received["body"],
        int(received["maxDistance"]),
        received["photovoltaics"]
    ]
    rating = Algos(*params)
    return rating


@app.route("/api/get-cars")
def get_cars_for_comparison():
    cars = list(get_cars())
    return jsonify(cars)


@app.route("/api/compare", methods=["POST"])
# {car1 : sth, car2: othr}
def compare_cars():
    result = dict()
    compare = request.args
    for key, value1, value2 in zip(
                            compare["car1"].items(), compare["car2"].values()):
        if key == "name":
            continue
        result[key] = max(value1, value2)
    return result


if __name__ == "__main__":
    ip = '192.168.137.203'
    db_name = 'GoElectricDb'
    db = pymongo.MongoClient(ip, 8080).get_database(db_name)
    app.run(debug=True, host="0.0.0.0")
