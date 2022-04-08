import random

"""
Generates random locations nearby given coordinates
"""

latitude = 0.794501
longitude = -0.752568
file_n = 'data/random_lat_lon.csv'
# shitty code from stackoverflow
def generate_random_data(lon, lat, num_rows):
    # with open(file_name, 'w') as output:
    plugs = list()
    for _ in range(num_rows):
        dec_lat = random.random()/150
        dec_lon = random.random()/150
        plug = (lon+dec_lon, lat+dec_lat)
        plugs.append(plug)
        # output.write('%.6f,%.6f \n' % (lon+dec_lon, lat+dec_lat))
    return plugs

# generate_random_data(latitude, longitude, 10, file_n)