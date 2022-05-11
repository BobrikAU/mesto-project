import {dataUser} from './utils.js';

//проверка ответа на запрос и его первичная обработка
const _checkResponse = res => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//запрос данных для профиля пользователя
export const uploadProfile = fetch(`${dataUser.urlCohort}/users/me`, {
    headers: {
      authorization: dataUser.token
    }
  })
  .then (_checkResponse);

//запрос данных для автоматического заполнения страницы карточками при загрузке
export const uploadСards = fetch(`${dataUser.urlCohort}/cards`, {
    headers: {
      authorization: dataUser.token
    }
  })
  .then(_checkResponse);

//запрос на редактирование профиля пользователя
export const requestProfileEditing = (nameUser, aboutUser) => {
  return fetch(`${dataUser.urlCohort}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: dataUser.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameUser,
      about: aboutUser
    })
  })
    .then(_checkResponse)
}

//запрос на добавление новой карточки на сервер
export const requestAddCard = (cardTitle, cardLink) => {
  return fetch (`${dataUser.urlCohort}/cards`, {
    method: 'POST',
    headers: {
      authorization: dataUser.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardTitle,
      link: cardLink
    })
  })
    .then(_checkResponse)
}

//запрос на удаление карточки
export const deleteСard = (card) => {
  return fetch(`${dataUser.urlCohort}/cards/${card.getAttribute('card_id')}`, {
    method: 'DELETE',
    headers: {
      authorization: dataUser.token
    }
  })
    .then(_checkResponse)
}

//запрос на добавление или удаление лайка
export const addLike = (card, requestMethod) => {
  return fetch (`${dataUser.urlCohort}/cards/likes/${card.getAttribute('card_id')}`, {
    method: requestMethod,
    headers: {
      authorization: dataUser.token
    }
  })
    .then(_checkResponse)
}

//запрос на редактирование аватара пользователя
export const requestEditAvatar = (avatarURL) => {
  return fetch(`${dataUser.urlCohort}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: dataUser.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarURL
    })
  })
    .then(_checkResponse)
}
