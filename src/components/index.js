import './../pages/index.css';
import {selectorsForIndex as selectors, selectorsForValidate, photosCards, profileName, profileSelf, popupEditProfile, popupProfileName, popupProfileSelf, buttonSubmitProfile} from './utils.js';
//import {selectorsForValidate} from './utils.js';
import {enableValidation, makeButtonInactive} from './validate.js';
//import {makeButtonInactive} from './validate.js';
import {clearErrors, openPopup, closePopup, closeWithButton, closePopupClickingOverlay} from './modal.js';
//import {openPopup} from './modal.js';
//import {closePopup} from './modal.js';
import {createNewCard} from './card.js';
//import {photosCards} from './utils.js';
//import {closeWithButton} from './modal.js';
//import {closePopupClickingOverlay} from './modal.js';

// вывод окна редактирования профиля на экран
function openPopupEditProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileSelf.value = profileSelf.textContent;
  makeButtonInactive(buttonSubmitProfile, selectors.classButtonSubmitDisabled);
  clearErrors(popupEditProfile)
  openPopup(popupEditProfile, selectors.classOpenedPopup);
}

          // установка слушателя на кнопку вызова окна редактирования профиля
(function activateButtonProfile(){
  const buttonEdit = document.querySelector(`.${selectors.classEditProfileButton}`);
  buttonEdit.addEventListener('click', openPopupEditProfile);
})();

// редактирование информации о пользователе в профиле

          //обработка запроса на редактирование профиля
function editProfile(event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileSelf.textContent = popupProfileSelf.value;
  closePopup(popupEditProfile);
}

          //установка слушателя на отправку формы с данными для редактирования профиля
(function prepareSubmitFormProfile() {
  const formEditProfile = popupEditProfile.querySelector(`.${selectors.classFromPopup}`);
  formEditProfile.addEventListener('submit', (event) => {
    editProfile(event);
  });
})();

// добавление новой карточки

          // обработка запроса пользователя на добавление новой карточки
function addCardUser(event, popupAddCard, formAddCard) {
  event.preventDefault();
  createNewCard(formAddCard.link.value, formAddCard.title.value);
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
  const buttonSubmitCard = popupAddCard.querySelector(`.${selectors.classButtonSubmit}`);
  const formAddCard = popupAddCard.querySelector(`.${selectors.classFromPopup}`);
  buttonAdd.addEventListener('click', function () {
    makeButtonInactive(buttonSubmitCard, selectors.classButtonSubmitDisabled);
    formAddCard.reset();
    clearErrors(popupAddCard)
    openPopup(popupAddCard, selectors.classOpenedPopup);
  });
  prepareSubmitFormNewCard(popupAddCard, formAddCard);
})();

// установка слушателей на закрытие модальных окон нажатием на кнопку закрытия попапа и оверлей
(function waitPopupClosingCommand() {
  const popups = document.querySelectorAll(`.${selectors.classPopup}`);
  popups.forEach( (item) => {
    item.addEventListener('click', (event) => {
      closeWithButton(event)
    });
    item.addEventListener('click', (event) => {
      closePopupClickingOverlay(event)
    });
  });
})();

// автоматическое заполнение карточками при загрузке
for (let i = 0; i < photosCards.length; i++) {
  const link = photosCards[i].link;
  const name = photosCards[i].name;
  createNewCard(link, name);
}

//валидация форм, запуск кода модуля validate
enableValidation(selectorsForValidate);


