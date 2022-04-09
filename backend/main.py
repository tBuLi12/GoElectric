from flask import Flask, request, jsonify
from algos import Algos
import adress_parser
import pymongo
app = Flask(__name__)
db = None


@app.route("/result")
def get_chargers():
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
    if request.method == "POST":
        print(request.data)
        received = request.args
        if received["country"] == "Polska":
            chargers_country = "chargersPoland"
        else:
            chargers_country = "chargersGermany"
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
        brands = db.get_collection('cars').distinct('CarName')
        cars = db.get_collection('cars').find({}, {
                    '_id': 0,
                    'CarName': 1,
                    'carbody': 1,
                    'enginesize': 1,
                    'price': 1
                })
        cars = list(cars)
        brands = process_brands(brands)
        address = adress_parser(
            received["addressName"],
            received["addressNum"],
            received["city"],
            received["country"])
        destinations = list()
        destinations.append(address)
        if received["destinations"]:
            destinations.extend(received["destinations"])
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
        top_cars = rating.find_best_car()[0:3]
        score = rating.calc_result()
        return {"score": score,
                "best_cars": {
                    1: top_cars[0],
                    2: top_cars[1],
                    3: top_cars[2]
                }}


if __name__ == "__main__":
    ip = '192.168.137.203'
    db_name = 'GoElectricDb'
    db = pymongo.MongoClient(ip, 8080).get_database(db_name)
    app.run(debug=True, host="0.0.0.0")
