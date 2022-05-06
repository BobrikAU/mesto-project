
const dataUser = {
  urlCohort: 'https://mesto.nomoreparties.co/v1/plus-cohort-9',
  token: '7f8d2163-5607-4805-9bb9-bec28100308e'
}

//запрос данных для профиля пользователя
export const makeProfilSection = () => {
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

//запрос данных для автоматического заплнения страницы карточками при загрузке
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
