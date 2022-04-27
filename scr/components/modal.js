import {makeButtonInactive} from './utils.js';
import {selectors} from '../index.js';
import {addNewCard} from './card.js';

//открытие модальных окон

          // непосредственное открытие модального окна
export function openPopup (popup) {
  popup.classList.add(selectors.classOpenedPopup);
}

          // активация модального окна для просмотра фотографии карточки
export function openPhotoInPopup(event) {
  const photoUrl = event.target.src;
  const photoAlt = event.target.alt;
  const photoTitle = event.target.closest(`.${selectors.classCard}`).querySelector(`.${selectors.classCaptionInCard}`).textContent;
  const popupPhotoCard = document.querySelector(`.${selectors.classPopupPhoto}`);
  popupPhotoCard.querySelector(`.${selectors.classPhotoInPopup}`).src = photoUrl;
  popupPhotoCard.querySelector(`.${selectors.classPhotoInPopup}`).alt = photoAlt;
  popupPhotoCard.querySelector(`.${selectors.classTitleInPopupPhoto}`).textContent = photoTitle;
  openPopup(popupPhotoCard);
}

          // вывод окна редактирования профиля на экран
function openPopupEditProfile() {
  const profileName = document.querySelector('.profile__title');
  const profileSelf = document.querySelector('.profile__subtitle');
  const popupEditProfile = document.querySelector('.popup__edit-profile');
  const popupProfileName = popupEditProfile.querySelector('.popup__name-field');
  const popupProfileSelf = popupEditProfile.querySelector('.popup__field-yourself');
  popupProfileName.value = profileName.textContent;
  popupProfileSelf.value = profileSelf.textContent;
  openPopup(popupEditProfile);
}

          // установка слушателя на кнопку вызова окна редактирования профиля
export function activateButtonProfile(){
  const buttonEdit = document.querySelector('.profile__edit-button');
  buttonEdit.addEventListener('click', openPopupEditProfile);
};

//закрытие модальных окон

          //непосредственное закрытие модального окна
function closePopup(popup) {
  const formPopup = popup.querySelector(`.${selectors.classFromPopup}`);
  const buttonSubmit = popup.querySelector(`.${selectors.classButtonSubmit}`);
  if (formPopup) {
    formPopup.reset();
    popup.querySelectorAll('.popup__input-error').forEach( item => {
      item.textContent = '';
    });
    popup.querySelectorAll(`.${selectors.classInputTextPopups}`).forEach( item => {
      item.classList.remove(selectors.classInputTextError);
    });
    makeButtonInactive(buttonSubmit, selectors.classButtonSubmitDisabled);
  }
  popup.classList.remove(selectors.classOpenedPopup);
}

          // активация закрытия модального окна нажатием мышью на оверлей
function closePopupClickingOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

          //активация закрытия попапа кнопкой escape
function closePopupKeyESC(event) {
  if (event.key === 'Escape') {
    const popupActive = document.querySelector(`.${selectors.classOpenedPopup}`);
    if (popupActive) {
      closePopup (popupActive);
    }
  }
}

          //активация закрытия попапа кнопкой в самом попапе
function closeWithButton(event) {
  if (event.target.classList.contains(`${selectors.classImgInCloseButton}`)) {
    const popupActive = document.querySelector(`.${selectors.classOpenedPopup}`);
    closePopup(popupActive);
  }
}

          // установка слушателей на на все варианты закрытия модальных окон
function waitPopupClosingCommand() {
  const popups = document.querySelectorAll(`.${selectors.classPopup}`);
  popups.forEach( (item) => {
    item.addEventListener('click', closeWithButton);
    item.addEventListener('click', closePopupClickingOverlay);
  });
  document.addEventListener('keydown', closePopupKeyESC);
};

// редактирование информации о пользователе в профиле

          //обработка запроса на редактирование профиля
function editProfile(event) {
  event.preventDefault();
  const popupEditProfile = document.querySelector('.popup__edit-profile');
  const profileName = document.querySelector('.profile__title');
  const popupProfileName = popupEditProfile.querySelector('.popup__name-field');
  const profileSelf = document.querySelector('.profile__subtitle');
  const popupProfileSelf = popupEditProfile.querySelector('.popup__field-yourself');
  profileName.textContent = popupProfileName.value;
  profileSelf.textContent = popupProfileSelf.value;
  closePopup(popupEditProfile);
}

          //установка слушателя на отправку формы с данными для редактирования профиля
function prepareSubmitFormProfile() {
  const popupEditProfile = document.querySelector('.popup__edit-profile');
  const formEditProfile = popupEditProfile.querySelector(`.${selectors.classFromPopup}`);
  formEditProfile.addEventListener('submit', editProfile);
}

// добавление новой карточки

          // обработка запроса пользователя на добавление новой карточки
function addCardUser(event) {
  event.preventDefault();
  const popupAddCard = document.querySelector('.popup__add-card');
  const formAddCard = popupAddCard.querySelector(`.${selectors.classFromPopup}`);
  addNewCard(formAddCard.link.value, formAddCard.title.value, selectors);
  closePopup(popupAddCard);
  formAddCard.reset();
}

          // установка слушателя на отправку формы с данными для новой карточки
function prepareSubmitFormNewCard(popupAddCard) {
  const formAddCard = popupAddCard.querySelector(`.${selectors.classFromPopup}`);
  formAddCard.addEventListener('submit', addCardUser);
}

          // установка слушателя на вызов окна добавления карточек
function activateButtonAddCard(){
  const buttonAdd = document.querySelector('.profile__add-button');
  const popupAddCard = document.querySelector('.popup__add-card');
  buttonAdd.addEventListener('click', function () {
    openPopup(popupAddCard);
  });
  prepareSubmitFormNewCard(popupAddCard);
};

export function startWorkingPopups() {
  activateButtonProfile();
  activateButtonAddCard();
  waitPopupClosingCommand();
  prepareSubmitFormProfile();
}
