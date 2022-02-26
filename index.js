
const editButton = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const popupEditProfile = document.querySelectorAll('.popup')[0]; // модальное окно редактирования профиля
const formEditProfile = popupEditProfile.querySelector('.popup__form'); // форма отправки данныйх для редактирования профиля пользователя
const popupProfileName = popupEditProfile.querySelectorAll('.popup__input-text')[0]; //поле для введения имени пользователя в модальном окне редактирования профиля
const popupProfileSelf = popupEditProfile.querySelectorAll('.popup__input-text')[1]; //поле для информации о пользователе в модальном окне редактирования профиля
const profileName = document.querySelector('.profile__title'); //заголовок с именем пользователя в профиле
const profileSelf = document.querySelector('.profile__subtitle'); //подзаголовок с информацией о пользователе в профиле
const addButton = document.querySelector('.profile__add-button'); // кнопка добавления карточек
const popupAddCard = document.querySelectorAll('.popup')[1]; // модальное окно добавления карточек
const formAddCard = popupAddCard.querySelector('.popup__form') // форма отправки данных для новой карточки
const closeButtons = document.querySelectorAll('.popup__close-button'); // список всех кнопок закрытия модальных окон
const emptyCard = document.querySelector('#empty-item').content; // пустая карточка для фотографии
const listCards = document.querySelector('.photos__list'); // список карточек с фотографиями
const popupPhotoCard = document.querySelector('.popup_photo'); // модальное окно показа фотографий карточек

// фотографии для карточек при загрузке
const photosCards = [
  {
    name : 'Летающий хищник',
    link : 'https://i.postimg.cc/4x0RGsq8/sammy-wong-96qgwu-Zu-PJs-unsplash.jpg',
  },
  {
    name : 'Птица',
    link : 'https://i.postimg.cc/pL09fh7s/cody-west-fx-OE7y8-Hm-Q8-unsplash-1.jpg',
  },
  {
    name : 'Красота волн',
    link : 'https://i.postimg.cc/TYdYt2nF/bernd-dittrich-db-51-OUU-m8-unsplash-1.jpg',
  },
  {
    name : 'Могучий кит',
    link : 'https://i.postimg.cc/VvY1Z40n/max-lissenden-sn-YLMKph-Cf4-unsplash-1.jpg',
  },
  {
    name : 'Энергия природы',
    link : 'https://i.postimg.cc/mrQvxCsw/navi-jtyjc-Qj6-Ml-A-unsplash-1.jpg',
  },
  {
    name : 'Рысь',
    link : 'https://i.postimg.cc/xTcBfWQq/mario-esposito-9-E2-Aztou-Xe-M-unsplash-1.jpg',
  }
];

// добавление и удаление лайка
function likeToCard(event) {
  event.target.parentElement.classList.toggle('button__icon-like_aktive');
  event.target.parentElement.blur();
}

// удаление карточки по выбору пользователя
function removeCard (event) {
  event.target.closest('.photos__item').remove();
}

// активация модального окна для просмотра фотографии карточки
function openPhotoInPopup(event) {
  const photoUrl = event.target.src;
  popupPhotoCard.querySelector('.popup__photo').src = photoUrl;
  popupPhotoCard.querySelector('.popup__photo').alt = event.target.alt;
  const cardTitle = event.target.parentElement.querySelector('.photos__caption').textContent;
  popupPhotoCard.querySelector('.popup__title_photo').textContent = cardTitle;
  closeOpenPopup(popupPhotoCard);
}

// функция дополнения карточки на страницу
function addNewCard(index) {
  const card = emptyCard.cloneNode(true);
  card.querySelector('.photos__photo').src = photosCards[index].link;
  card.querySelector('.photos__photo').alt = photosCards[index].name;
  card.querySelector('.photos__caption').textContent = photosCards[index].name;
  listCards.prepend(card);
  // лайки
  const listLikes = document.querySelectorAll('.photos__like-button');
  listLikes[0].addEventListener('click', likeToCard);
  // удаление карточек
  const trashButton = document.querySelector('.button_function_trash');
  trashButton.addEventListener('click', removeCard);
  // открытие фотографий карточек в модальном окне
  const photoInCard = document.querySelector('.photos__photo');
  photoInCard.addEventListener('click', openPhotoInPopup);
}

// автоматическое заполнение карточками при загрузке
for (let i = 0; i < photosCards.length; i++) {
  addNewCard(i);
}

// непосредственное открытие и закрытие модального окна
function closeOpenPopup (popup) {
  if (!popup.classList.contains('popup_opened')) {
    popup.classList.add('popup_opened');
  } else {
    popup.classList.add('popup_closed');
    setTimeout(() => {
      popup.classList.remove('popup_closed');
      popup.classList.remove('popup_opened');
    }, 600);
  }
}

// вызов окна редактирования профиля
editButton.addEventListener('click', function () {
  popupProfileName.removeAttribute('placeholder');
  popupProfileName.setAttribute('value', profileName.textContent);
  popupProfileSelf.removeAttribute('placeholder');
  popupProfileSelf.setAttribute('value', profileSelf.textContent);
  closeOpenPopup(popupEditProfile);
});

// вызов окна добавления карточек
addButton.addEventListener('click', function () {
  closeOpenPopup(popupAddCard);
});

// деактивация любого модального окна, данные не сохраняются
closeButtons.forEach( function (button) {
  button.addEventListener('click', function (event) {
    const activePopup = event.target.parentElement.parentElement.parentElement;
    closeOpenPopup(activePopup);
  });
});

// добавление новой карточки пользователем
formAddCard.addEventListener('submit', function (event) {
  event.preventDefault();
  const index = photosCards.length;
  photosCards.push({});
  photosCards[index].name = popupAddCard.querySelectorAll('.popup__input-text')[0].value;
  photosCards[index].link = popupAddCard.querySelectorAll('.popup__input-text')[1].value;
  addNewCard(index);
  closeOpenPopup(event.target.parentElement.parentElement);
});

// редактирование информации о пользователе в профиле
formEditProfile.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileSelf.textContent = popupProfileSelf.value;
  closeOpenPopup(event.target.parentElement.parentElement);
});
