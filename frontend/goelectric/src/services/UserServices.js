class UserService {
  async postCarForm(userData) {
    return fetch("/form/carForm", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new UserService();
