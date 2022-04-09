class UserServices {
  async postCarForm(userData, customLocations) {
    return customLocations ?  
      fetch("/api/form/locations", {
        method: "POST",
        body: JSON.stringify({...userData, destAddress: customLocations.map(JSON.parse).map(e => [e.longitude, e.latitude])}),
        headers: {
          "Content-Type": "application/json",
        },
      }) 
    : fetch("/api/form/carForm", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  }

  async getBrands() {
    return fetch("/api/brands");
  }

  async getBody() {
    return fetch("/api/carbody");
  }

  async getTinder() {
    return fetch("/api/get/cars");
  }
}

export default new UserServices();
