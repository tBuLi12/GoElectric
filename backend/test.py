from backend.algos import Algos
from backend.utils.close_geoloc_generator import generate_random_data
import csv


data = []

with open('backend/data/ElectricCarData_Clean.csv') as f:
    data = [{k.strip(): v.strip() for k, v in row.items()}
            for row in csv.DictReader(f, skipinitialspace=True)]

plugs = generate_random_data(52.192480450000005, 20.863948974535923, 10)
brands = ['Tesla', 'Peugeot', 'Honda']
place = [[52.192480450000005, 20.863948974535923]]

alg = Algos(2000000, plugs, place, brands, data, 10, 3, 'Hatchback', 2, True)
print(alg.get_result())
# print(alg.calc_brand())
# print(alg.calc_chargers())
# print(alg.calc_prize())
# print(alg.calc_charges())
