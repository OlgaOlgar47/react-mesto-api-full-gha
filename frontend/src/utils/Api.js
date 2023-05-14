class Api {
  constructor({ baseURL, headers }) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserData = () => {
    return fetch(this.baseURL + "/users/me", {
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  };

  editUserData = (values) => {
    return fetch(this.baseURL + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: values.name,
        about: values.about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  };

  changeAvatar = (data) => {
    return fetch(this.baseURL + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  };

  getInitialCards = () => {
    return fetch(this.baseURL + "/cards", {
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  };

  deleteCard = (id) => {
    return fetch(this.baseURL + "/cards/" + id, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  };

  createCard = (values) => {
    return fetch(this.baseURL + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: values.name,
        link: values.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  };

  likeCard = (id) => {
    return fetch(this.baseURL + "/cards/" + id + "/likes", {
      method: "PUT",
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  };

  deleteLike = (id) => {
    return fetch(this.baseURL + "/cards/" + id + "/likes", {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  };
}

const api = new Api({
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "14108236-2953-4b21-88a6-cac7407c6c52",
    "Content-Type": "application/json",
  },
});

export default api;
