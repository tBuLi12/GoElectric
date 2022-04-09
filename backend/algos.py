# from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from scipy.stats import logistic
import numpy as np

wages = [1, 1, 1, 1, 1]


class Algos:
    def __init__(
                self,
                max_prize: int,
                voltaics: bool,
                plugs: list,
                brand: list,
                cars_on_market: list,
                destinations: list,
                max_dist,
                avg_dist,
                days_per_week,
                prefered_body) -> None:
        self.wages = wages
        self.brand_wage = self.wages[0]
        self.charges_wage = self.wages[1]
        self.prize_wage = self.wages[2]
        self.plug_wage = self.wages[3]
        self.voltaics_wage = self.wages[4]
        self.max_prize = max_prize
        self.voltaics = voltaics
        self.plugs = plugs
        self.brand = brand
        self.cars = cars_on_market
        self.places = destinations
        self.max_dist = max_dist
        self.avg_dist = avg_dist
        self.days_per_week = days_per_week
        self.prefered_body = prefered_body

    def calc_result(self):
        brand = self.brand_wage*self.calc_brand()
        charges = self.charges_wage*self.calc_charges()
        prizes = self.prize_wage*self.calc_prize()
        plug = self.plug_wage*self.calc_plug()
        voltaics = self.voltaics_wage*self.calc_voltaics()
        wages_sum = sum(self.wages)
        return (brand+charges+prizes+plug+voltaics)/wages_sum

    def calc_brand(self):
        considered = 0
        liked = 0
        for car in self.cars:
            if car[3] < self.max_prize:
                considered += 1
                if car[0].split()[0] in self.brand:
                    liked += 1
        return liked/considered

    def calc_plug(self):
        place_ranks = 0
        for place in self.places:
            place_ranks = self.find_plugins(place)
        return place_ranks/len(self.places)

    def calc_prize(self):
        car_rank = 0
        for car in self.cars:
            car_prize = int(car[2])
            if car_prize < self.max_prize:
                car_rank += 1
            elif car_prize < 1.25*self.max_prize:
                car_rank += (-1/(self.max_prize*1.25))*car_prize + 2
        return car_rank/len(self.cars)

    def calc_charges(self):
        avg_range = 0
        considered = 0
        if self.days_per_week <= 0 or self.avg_dist <= 0:
            return 0.0
        for car in self.cars:
            if car[3] < self.max_prize:
                avg_range += car[1]
                considered += 1
        avg_range = avg_range/considered
        return logistic.cdf(1/(self.days_per_week*self.avg_dist/avg_range))

    def calc_voltaics(self):
        return float(self.voltaics)

    def find_plugins(self, place_coords):
        in_radius = 0
        considered = 0
        for plug in self.plugs:
            dist = float(geodesic(plug, place_coords).km)
            if dist < self.max_dist:
                in_radius += (-1/self.max_dist)*dist + 1
                considered += 1
        if considered:
            return in_radius/considered
        return 0

    def find_best_car(self):
        rejected = list()
        chosen = list()
        for car in self.cars:
            if car[3] < self.max_prize and car[0].split()[0] in self.brand and car[1] == self.prefered_body:
                chosen.append(car)
            else:
                rejected.append(car)
        chosen = sorted(chosen, key=lambda x: x[3], reverse=True)
        return np.append(chosen, rejected, axis=0)
