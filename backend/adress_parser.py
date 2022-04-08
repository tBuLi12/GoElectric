from geopy.geocoders import Nominatim


def parse_address(args):
    address = " ".join(args)
    return address


def get_addres(*args):
    geolocator = Nominatim(user_agent="GoElectric")
    location = geolocator.geocode(parse_address(args))
    return (location.longitude, location.latitude)
