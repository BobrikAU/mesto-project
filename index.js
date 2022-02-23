const addButton = document.querySelector('.profile__add-button'); //кнопка добавления фотографий
const editButton = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const profilePopup = document.querySelector('.popup'); //диалоговое окно редактирования профиля
const closeButton = document.querySelector('.popup__close-button'); //кнопка закрытия диалогового окна
const profileName = document.querySelector('.profile__title'); //заголовок с именем пользователя в профиле
const popupProfileName = document.querySelector('[name=name]'); //поле для введения имени пользователя в модальном окне редактирования профиля
const profileSelf = document.querySelector('.profile__subtitle'); //подзаголовок с информацией о пользователе в профиле
const popupProfileSelf = document.querySelector('[name=about-self]'); //поле для информации о пользователе в модальном окне редактирования профиля
const formElement = document.querySelector('.popup__form'); //форма отправки данных для профиля пользователя
const emptyCard = document.querySelector('#empty-item').content; // заготовка верстки карточки с фотографией
const photosList = document.querySelector('.photos__list'); // список карточек с фотографиями

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

//обработчик закрытия модального окна
function closePopup() {
  profilePopup.className = 'popup';
}

//обработчик отправки формы
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileSelf.textContent = popupProfileSelf.value;
  closePopup();
}

//открытие модального окна
editButton.addEventListener('click', function() {
  popupProfileName.removeAttribute('placeholder');
  popupProfileName.setAttribute('value', profileName.textContent);
  popupProfileSelf.removeAttribute('placeholder');
  popupProfileSelf.setAttribute('value', profileSelf.textContent);
  profilePopup.className = 'popup popup_opened';
});

//закрытие модального окна
closeButton.addEventListener('click', closePopup);

//сохранение изменений в профиле пользователя из формы
formElement.addEventListener('submit', formSubmitHandler);

// автоматическая загрузка карточек с фотографиями при старте
for (let i = 0; i < 6; i++) {
  const card = emptyCard.cloneNode(true);
  card.querySelector('.photos__photo').src = photosCards[i].link;
  card.querySelector('.photos__photo').alt = photosCards[i].name;
  card.querySelector('.photos__caption').textContent = photosCards[i].name;
  photosList.append(card);
}



