import requests

url = 'https://api.openchargemap.io/v3/poi/?output=json&countrycode=PL&maxresults=763'
params = {'key': 'f2c1a2cc-86bc-40b3-9bf7-12eaf927ebaf'}
get_stations_json = requests.get(url, params).json()


stations = []

for station in get_stations_json:
    new_station = {
        '_id': station['ID'],
        'Latitude': station['AddressInfo']['Latitude'],
        'Longitude': station['AddressInfo']['Longitude']
    }
    stations.append(new_station)
