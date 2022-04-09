from geopy.geocoders import Nominatim


def parse_address(args):
    result = str()
    for arg in args:
        result = result + " " + arg
    return result.lstrip()


def get_address(*args):
    geolocator = Nominatim(user_agent="GoElectric")
    print(parse_address(args))
    location = geolocator.geocode(parse_address(args))
    return [location.longitude, location.latitude]
