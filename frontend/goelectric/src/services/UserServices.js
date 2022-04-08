class UserService {
  async postCarForm(userData) {
    return fetch("/form/carForm", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }
}

export default new UserService();
