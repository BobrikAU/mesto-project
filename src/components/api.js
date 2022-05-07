import {dataUser} from './utils.js';

//запрос данных для профиля пользователя
export const uploadProfilSection = () => {
  return fetch(`${dataUser.urlCohort}/users/me`, {
    headers: {
      authorization: dataUser.token
    }
  })
    .then ((res) => {
      if (res.ok) {
        return res.json()
      }else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    })
}

//запрос данных для автоматического заполнения страницы карточками при загрузке
export const uploadСards = () => {
  return fetch(`${dataUser.urlCohort}/cards`, {
    headers: {
      authorization: dataUser.token
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err)
      return Promise.reject()
    });
}

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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject();
    })
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject();
    })
}

//запрос на удаление карточки
export const deleteСard = (card) => {
  return fetch(`${dataUser.urlCohort}/cards/${card.getAttribute('card_id')}`, {
    method: 'DELETE',
    headers: {
      authorization: dataUser.token
    }
  })
    .then((res) => {
      if (res.ok) {
        return res
      }else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject();
    })
}

