from flask import Flask, request
from algos import Algos
app = Flask(__name__)


@app.route("/result")
def get_chargers():
    return {"result": "Mondry wynik algorytmu Victora xD"}


@app.route("/form/carForm", methods=["POST"])
def post_user_answers():
    if request.method == "POST":
        # print(request.data)
        received = request.args
        plugs = "ask db for it - need to convert that"
        cars = "ask db for it"
        rating = Algos(
            received["price"],
            received["voltaics"],
            plugs,
            received["brands"],
            cars,
            received["destinations"],
            received["max_distance"],
            received["avg_distance"],
            received["days_per_week"])
        return {"score": 21.37,
                "best_cars": {
                    1: "Fiat Multipla",
                    2: "Polonez",
                    3: "Twoja Stara"
                }}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
