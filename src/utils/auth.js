const BASE_URL = "https://auth.nomoreparties.co";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      console.log(response);
      try {
        if (response.status === 201) {
          return response.json();
        }
      } catch (err) {
        return err;
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
