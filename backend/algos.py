from geopy.distance import geodesic
from scipy.stats import logistic
import numpy as np

wages = {
    'brand': 1,
    'range': 2,
    'prize': 10,
    'chargers': 3,
    'voltaics': 0.5
}


class Algos:
    def __init__(
            self,
            max_prize: int,
            charg_loc: list,
            freq_dest: list,
            brands: list,
            cars: list,
            daily_dist: int,
            days_riding: int,
            pref_body: str,
            walk_range=2,
            voltaics=1) -> None:
        self.wages = wages
        self.max_prize = int(max_prize)
        self.charg_loc = charg_loc
        self.freq_dest = freq_dest
        self.brands = brands
        self.cars = cars
        self.daily_dist = int(daily_dist)
        self.days_riding = int(days_riding)
        self.pref_body = pref_body
        self.walk_range = int(walk_range)
        self.voltaics = walk_range
        self.accesable_cars = []
        self.rejected_cars = []
        self.prefered_cars = []

        for car in self.cars:
            if int(car['PriceEuro']) < 1.25*int(self.max_prize):
                self.accesable_cars.append(car)
            else:
                self.rejected_cars.append(car)

        for car in self.accesable_cars:
            if car['Brand'] in self.brands and car['BodyStyle'] in self.pref_body:
                self.prefered_cars.append(car)
            else:
                self.rejected_cars.append(car)

    def get_result(self):
        brand = self.wages['brand']*self.calc_brand()
        charges = self.wages['range']*self.calc_charges()
        prizes = self.wages['prize']*self.calc_prize()
        chargers = self.wages['chargers']*self.calc_chargers()
        voltaics = self.wages['voltaics']*self.voltaics
        wages_sum = sum(self.wages.values())
        return (brand+charges+prizes+chargers+voltaics)/wages_sum

    def calc_brand(self):
        if len(self.accesable_cars) == 0:
            return 0.0
        return len(self.prefered_cars)/len(self.accesable_cars)

    def calc_chargers(self):
        place_ranks = 0
        for place in self.charg_loc:
            place_ranks = self.find_chargers(place)
        return place_ranks/len(self.charg_loc)

    def find_chargers(self, place):
        in_radius = 0
        considered = 0
        for charger in self.charg_loc:
            dist = float(geodesic(charger, place).km)
            if dist < self.walk_range:
                in_radius += (-1/self.walk_range)*dist + 1
                considered += 1
            if considered:
                return in_radius/considered
            return 0

    def calc_prize(self):
        prize_rank = 0
        for car in self.accesable_cars:
            if int(car['PriceEuro']) < self.max_prize:
                prize_rank += 1
            else:
                widen_prize = self.max_prize * 1.25
                prize_rank += (-1/(widen_prize))*int(car['PriceEuro'])+2
        if len(self.accesable_cars) == 0:
            return 0
        return prize_rank/len(self.accesable_cars)

    def calc_charges(self):
        avg_range = 0
        if int(self.days_riding) <= 0 or int(self.daily_dist) <= 0:
            return 0.0
        for car in self.prefered_cars:
            avg_range += int(car['Range_Km'])
        if len(self.prefered_cars) == 0:
            return 0.0
        if len(self.prefered_cars) == 0:
            return 0
        avg_range = avg_range/len(self.prefered_cars)
        return logistic.cdf(1/((self.days_riding*self.daily_dist)/avg_range))

    def find_best_car(self):
        chosen = self.prefered_cars
        rejected = self.rejected_cars
        chosen = sorted(chosen, key=lambda d: int(d['PriceEuro']),
                        reverse=True)
        rejected = sorted(rejected,
                          key=lambda d: int(d['PriceEuro']), reverse=True)
        return np.append(chosen, rejected)
