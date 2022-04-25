import {makeButtonInactive} from './utils.js';
import {selectors} from '../index.js';

//открытие модальных окон

          // непосредственное открытие модального окна
export function openPopup (popup) {
  popup.classList.add(selectors.classOpenedPopup);
  openAdditionalWaysClosePopup(popup);
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
export function openPopupEditProfile() {
  const profileName = document.querySelector('.profile__title');
  const profileSelf = document.querySelector('.profile__subtitle');
  const popupEditProfile = document.querySelector('.popup__edit-profile');
  const popupProfileName = popupEditProfile.querySelector('.popup__name-field');
  const popupProfileSelf = popupEditProfile.querySelector('.popup__field-yourself');
  popupProfileName.value = profileName.textContent;
  popupProfileSelf.value = profileSelf.textContent;
  openPopup(popupEditProfile);
  prepareSubmitFormProfile();
}

//закрытие модальных окон

          //непосредственное закрытие модального окна
function closePopup(popup) {
  const containerPopup = popup.querySelector('.popup__container');
  const formPopup = popup.querySelector(`.${selectors.classFromPopup}`);
  const buttonSubmit = popup.querySelector(`.${selectors.classButtonSubmit}`);
  containerPopup.removeEventListener('click', stopPropagation);
  popup.removeEventListener('click', closePopupClickingOverlay);
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
  document.removeEventListener('keydown', closePopupKeyESC);
}

          // активация закрытия модального окна нажатием мышью на оверлей
function stopPropagation(event) {
  event.stopPropagation();
}
function closePopupClickingOverlay(event) {
  closePopup(event.currentTarget);
}

          //активация закрытия попапа кнопкой escape
function closePopupKeyESC(event) {
  if (event.key === 'Escape') {
    const popupActive = document.querySelector(`.${selectors.classOpenedPopup}`);
    closePopup (popupActive);
  };
}

          //активация закрытия попапа кнопкой в самом попапе
export function closeWithButton(event) {
  event.stopPropagation();
  const popupActive = document.querySelector(`.${selectors.classOpenedPopup}`);
  closePopup(popupActive);
}

          //установка слушателей для альтернативных способов закрытия модального окна
function openAdditionalWaysClosePopup(popup) {
  document.addEventListener('keydown', closePopupKeyESC);
  const containerPopup = popup.querySelector('.popup__container');
  containerPopup.addEventListener('click', stopPropagation);
  popup.addEventListener('click', closePopupClickingOverlay);
}

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
import {addNewCard} from './card.js';
function addCardUser(event) {
  event.preventDefault();
  const popupAddCard = document.querySelector('.popup__add-card');
  const formAddCard = popupAddCard.querySelector(`.${selectors.classFromPopup}`);
  addNewCard(formAddCard.link.value, formAddCard.title.value, selectors);
  closePopup(popupAddCard);
  formAddCard.reset();
}

          // установка слушателя на отправку формы с данными для новой карточки
export function prepareSubmitFormNewCard() {
  const popupAddCard = document.querySelector('.popup__add-card');
  const formAddCard = popupAddCard.querySelector(`.${selectors.classFromPopup}`);
  formAddCard.addEventListener('submit', addCardUser);
}
