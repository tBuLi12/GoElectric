import random

"""
Generates random locations nearby given coordinates
"""

latitude = 0.794501
longitude = -0.752568
file_n = 'data/random_lat_lon.csv'
# shitty code from stackoverflow
def generate_random_data(lat, lon, num_rows, file_name):
    with open(file_name, 'w') as output:
        for _ in range(num_rows):
            dec_lat = random.random()/100
            dec_lon = random.random()/100
            output.write('%.6f,%.6f \n' % (lon+dec_lon, lat+dec_lat))

generate_random_data(latitude, longitude, 10, file_n)