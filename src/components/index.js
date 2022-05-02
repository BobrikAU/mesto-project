import './../pages/index.css';
import {selectors} from './utils.js';
import {enableValidation} from './validate.js';
import {makeButtonInactive} from './validate.js';
import {clearErrors} from './modal.js';
import {openPopup} from './modal.js';
import {closePopup} from './modal.js';
import {createNewCard} from './card.js';
import {photosCards} from './utils.js';
import {closeWithButton} from './modal.js';
import {closePopupClickingOverlay} from './modal.js';

// вывод окна редактирования профиля на экран
function openPopupEditProfile() {
  const profileName = document.querySelector(`.${selectors.classProfileTitle}`);
  const profileSelf = document.querySelector(`.${selectors.classProfileSubtitle}`);
  const popupEditProfile = document.querySelector(`.${selectors.classEditProfilePopup}`);
  const popupProfileName = popupEditProfile.querySelector(`.${selectors.classEditProfilePopupName}`);
  const popupProfileSelf = popupEditProfile.querySelector(`.${selectors.classEditProfilePopupYourself}`);
  const buttonSubmit = popupEditProfile.querySelector(`.${selectors.classButtonSubmit}`);
  popupProfileName.value = profileName.textContent;
  popupProfileSelf.value = profileSelf.textContent;
  makeButtonInactive(buttonSubmit, selectors.classButtonSubmitDisabled);
  clearErrors(popupEditProfile, selectors)
  openPopup(popupEditProfile, selectors.classOpenedPopup);
}

          // установка слушателя на кнопку вызова окна редактирования профиля
(function activateButtonProfile(){
  const buttonEdit = document.querySelector(`.${selectors.classEditProfileButton}`);
  buttonEdit.addEventListener('click', openPopupEditProfile);
})();

// редактирование информации о пользователе в профиле

          //обработка запроса на редактирование профиля
function editProfile(event, popupEditProfile) {
  event.preventDefault();
  const profileName = document.querySelector(`.${selectors.classProfileTitle}`);
  const popupProfileName = popupEditProfile.querySelector(`.${selectors.classEditProfilePopupName}`);
  const profileSelf = document.querySelector(`.${selectors.classProfileSubtitle}`);
  const popupProfileSelf = popupEditProfile.querySelector(`.${selectors.classEditProfilePopupYourself}`);
  profileName.textContent = popupProfileName.value;
  profileSelf.textContent = popupProfileSelf.value;
  closePopup(popupEditProfile);
}

          //установка слушателя на отправку формы с данными для редактирования профиля
(function prepareSubmitFormProfile() {
  const popupEditProfile = document.querySelector(`.${selectors.classEditProfilePopup}`);
  const formEditProfile = popupEditProfile.querySelector(`.${selectors.classFromPopup}`);
  formEditProfile.addEventListener('submit', (event) => {
    editProfile(event, popupEditProfile);
  });
})();

// добавление новой карточки

          // обработка запроса пользователя на добавление новой карточки
function addCardUser(event, popupAddCard, formAddCard) {
  event.preventDefault();
  createNewCard(formAddCard.link.value, formAddCard.title.value, selectors);
  closePopup(popupAddCard);
}

          // установка слушателя на отправку формы с данными для новой карточки
function prepareSubmitFormNewCard(popupAddCard, formAddCard) {
  formAddCard.addEventListener('submit', (event) => {
    addCardUser(event, popupAddCard, formAddCard);
  });
}

          // установка слушателя на вызов окна добавления карточек
(function activateButtonAddCard(){
  const buttonAdd = document.querySelector(`.${selectors.classAddPhotoButton}`);
  const popupAddCard = document.querySelector(`.${selectors.classAddCardPopup}`);
  const buttonSubmit = popupAddCard.querySelector(`.${selectors.classButtonSubmit}`);
  const formAddCard = popupAddCard.querySelector(`.${selectors.classFromPopup}`);
  buttonAdd.addEventListener('click', function () {
    makeButtonInactive(buttonSubmit, selectors.classButtonSubmitDisabled);
    formAddCard.reset();
    clearErrors(popupAddCard, selectors)
    openPopup(popupAddCard, selectors.classOpenedPopup);
  });
  prepareSubmitFormNewCard(popupAddCard, formAddCard);
})();

// установка слушателей на закрытие модальных окон нажатием на кнопку закрытия попапа и оверлей
(function waitPopupClosingCommand() {
  const popups = document.querySelectorAll(`.${selectors.classPopup}`);
  popups.forEach( (item) => {
    item.addEventListener('click', (event) => {
      closeWithButton(event, selectors)
    });
    item.addEventListener('click', (event) => {
      closePopupClickingOverlay(event, selectors)
    });
  });
})();

// автоматическое заполнение карточками при загрузке
for (let i = 0; i < photosCards.length; i++) {
  const link = photosCards[i].link;
  const name = photosCards[i].name;
  createNewCard(link, name, selectors);
}

//валидация форм, запуск кода модуля validate
enableValidation(selectors);


