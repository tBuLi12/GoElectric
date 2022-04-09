from algos import Algos
from shittyRandomGeoLocationsGenerator import generate_random_data as generate
import csv


data = []

with open('backend/data/ElectricCarData_Clean.csv') as f:
    for row in csv.DictReader(f, skipinitialspace=True):
        d = {k: v.strip() for k, v in row.items()}
        d['AccelSec'] = float(d['AccelSec'])
        d["TopSpeed_KmH"] = float(d["TopSpeed_KmH"])
        d['Range_Km'] = int(d['Range_Km'])
        d['Efficiency_WhKm'] = float(d['Efficiency_WhKm'])
        if d['FastCharge_KmH'] == '-':
            del d['FastCharge_KmH']
        else:
            d['FastCharge_KmH'] = float(d['FastCharge_KmH'])
        d['RapidCharge'] = True if d['RapidCharge'] == 'Yes' else False
        d['Seats'] = int(d['Seats'])
        d['PriceEuro'] = int(d['PriceEuro'])
        data.append(d)


# with open('backend/data/archive/ElectricCarData_Clean.csv') as f:
#     data = [{k: v.strip() for k, v in row.items()}
#         for row in csv.DictReader(f, skipinitialspace=True)]

plugs = generate(52.192480450000005, 20.863948974535923, 10)
brands = ['Tesla', 'Peugeot', 'Honda']
place = [[52.192480450000005, 20.863948974535923]]

alg = Algos(2000000, plugs, place, brands, data, 10, 3, 'Hatchback', 2, True)
# print(alg.get_result())
# print(alg.calc_brand())
# print(alg.calc_chargers())
# print(alg.calc_prize())
# print(alg.calc_charges())
