from flask import Flask, request, jsonify
from algos import Algos
from utils import adress_parser
import pymongo
app = Flask(__name__)
db = None


@app.route("/result")
def get_chargers():
    app.logger.info("=== Test Log ===")
    return {"result": "Mondry wynik algorytmu Victora xD"}


@app.route("/brands")
def get_brands():
    car_brands = db.get_collection('cars').distinct('CarName')
    return jsonify(process_brands(car_brands))


@app.route("/carbody")
def get_carbody():
    car_body = db.get_collection('cars').distinct('carbody')
    return jsonify(car_body)


def process_brands(car_brands: list):
    unique_brands = list()
    for brand in car_brands:
        splitted = brand.split(" ")
        unique_brands.append(splitted[0].lower())
    return sorted(list(set(unique_brands)))


@app.route("/form/carForm", methods=["POST"])
def post_user_answers():
    if not request.method == "POST":
        return
    app.logger.info(request.data)
    received = request.args
    if received["country"] == "Polska":
        chargers_country = "chargersPoland"
    else:
        chargers_country = "chargersGermany"
    chargers = get_charging_points(chargers_country)
    brands = db.get_collection('cars').distinct('CarName')
    cars = get_cars()
    cars = list(cars)
    brands = process_brands(brands)
    address = adress_parser(
        received["userAddress"]["hello"],
        received["userAddress"]["num"],
        received["city"],
        received["country"])
    destinations = list()
    destinations.append(address)
    if received["destAddress"]:
        destinations.extend(received["destAddress"])
    rating = get_rating(received, chargers, brands, cars, destinations)
    top_cars = rating.find_best_car()[0:3]
    score = rating.calc_result()
    return {"score": score,
            "best_cars": {
                1: top_cars[0],
                2: top_cars[1],
                3: top_cars[2]
            }}


def get_charging_points(chargers_country):
    chargers = db.get_collection(chargers_country).aggregate([
            {'$group': {
                '_id': None,
                'loc': {'$push': {'$function': {
                    'body': 'function(la, lg) {return [la, lg]}',
                    'args': ['$latitude', '$longditude'],
                    'lang': 'js',
                        }}}
            }}
        ]).next()['loc']
    return chargers


def get_cars():
    cars = db.get_collection('cars').find({}, {
                    '_id': 0,
                    'CarName': 1,
                    'carbody': 1,
                    'enginesize': 1,
                    'price': 1
                })
    return cars


def get_rating(received, chargers, brands, cars, destinations):
    rating = Algos(
            received["price"],
            received["photovoltaics"],
            chargers,
            received["brands"],
            brands,
            cars,
            destinations,
            received["maxDistance"],
            received["km"],
            received["days"],
            received["body"])
    return rating


@app.route("/get-cars")
def get_cars_for_comparison():
    cars = list(get_cars())
    return jsonify(cars)


@app.route("/compare")
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
