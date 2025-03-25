// стандартный запрос на сервер
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "855ccfd8-7f7a-426c-838f-841d977d9309",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// запрашиваем информацию о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

// запрашиваем информацию о карточках с сервера
export const getCardsInfo = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

// обновляем информацию о пользователе на сервере
export const updateUserInfo = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  }).then(checkResponse);
};

// выкладываем новую карточку на сервер
export const postNewCard = (place, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: place,
      link: link,
    }),
  }).then(checkResponse);
};

// удаляем карточку с сервера
export const deletePostedCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// добавляем лайк на сервере
export const addLikeToCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

// убираем лайк на сервере
export const deleteLikeFromCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// обновляем аватарку пользователя на сервере
export const updateUserAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(checkResponse);
};

// проверяем введена ли ссылка именно на картинку
export const isImageUrlValid = (url) => {
  return fetch(url, {
    method: "HEAD",
  }).then((res) => {
    if (res.ok) {
      const contentType = res.headers.get("Content-Type");
      return contentType && contentType.startsWith("image/");
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
