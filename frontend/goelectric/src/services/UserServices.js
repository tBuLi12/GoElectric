class UserServices {
  async postCarForm(userData) {
    return fetch("/api/form/carForm", {
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
