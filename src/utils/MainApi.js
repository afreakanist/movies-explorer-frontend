class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  editUserInfo(userData, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: userData.name, email: userData.email }),
    }).then((res) => this._getResponseData(res));
  }

  getMovieCards(token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  postMovieCard(movieData, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...movieData }),
    }).then((res) => this._getResponseData(res));
  }

  deleteMovieCard(cardId, token) {
    return fetch(`${this._baseUrl}/movies/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  baseUrl: `${window.location.protocol}${
    process.env.REACT_APP_API_URL || "//localhost:3001"
  }`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
