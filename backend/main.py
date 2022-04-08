from flask import Flask, request, jsonify
import requests
app = Flask(__name__)

@app.route("/result")
def get_chargers():
    return "Mondry wynnik algorytmu Victora"


@app.route("/form")
def post_user_answers():
    pass

if __name__ == "__main__":
    app.run(debug=True)