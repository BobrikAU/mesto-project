
//import {} from './utils.js';

const dataUser = {
  urlCohort: 'https://mesto.nomoreparties.co/v1/plus-cohort-9',
  token: '7f8d2163-5607-4805-9bb9-bec28100308e'
}

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
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    })
}
