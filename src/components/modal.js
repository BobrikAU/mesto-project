import {makeButtonInactive} from './utils.js';
import {selectors} from './index.js';
import {addNewCard} from './card.js';


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
  document.removeEventListener('keydown', closePopupKeyESC);
  popup.classList.remove(selectors.classOpenedPopup);
}

          //активация закрытия попапа кнопкой escape
function closePopupKeyESC(event) {
  if (event.key === 'Escape') {
    const popupActive = document.querySelector(`.${selectors.classOpenedPopup}`);
    closePopup (popupActive);
  }
}
          //установка слушателя на закрытие попапа клавишей ESC
function waitPopupClosingCommandEsc () {
  document.addEventListener('keydown', closePopupKeyESC);
}

          // активация закрытия модального окна нажатием мышью на оверлей
function closePopupClickingOverlay(event, selectors) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget, selectors);
  }
}
 
          //активация закрытия попапа кнопкой в самом попапе
function closeWithButton(event, selectors) {
  if (event.target.classList.contains(`${selectors.classImgInCloseButton}`)) {
    const popupActive = document.querySelector(`.${selectors.classOpenedPopup}`);
    closePopup(popupActive, selectors);
  }
}
 
          // установка слушателей на закрытие модальных окон нажатием на кнопку закрытия попапа и оверлей
function waitPopupClosingCommand(selectors) {
  const popups = document.querySelectorAll(`.${selectors.classPopup}`);
  popups.forEach( (item) => {
    item.addEventListener('click', (event) => {
      closeWithButton(event, selectors)
    });
    item.addEventListener('click', (event) => {
      closePopupClickingOverlay(event, selectors)
    });
  });
};

//открытие модальных окон

          // непосредственное открытие модального окна
export function openPopup (popup, selectors) {
  popup.classList.add(selectors.classOpenedPopup);
  waitPopupClosingCommandEsc ();
}

          // активация модального окна для просмотра фотографии карточки
export function openPhotoInPopup(event, selectors) {
  const photoUrl = event.target.src;
  const photoAlt = event.target.alt;
  const photoTitle = event.target.closest(`.${selectors.classCard}`).querySelector(`.${selectors.classCaptionInCard}`).textContent;
  const popupPhotoCard = document.querySelector(`.${selectors.classPopupPhoto}`);
  popupPhotoCard.querySelector(`.${selectors.classPhotoInPopup}`).src = photoUrl;
  popupPhotoCard.querySelector(`.${selectors.classPhotoInPopup}`).alt = photoAlt;
  popupPhotoCard.querySelector(`.${selectors.classTitleInPopupPhoto}`).textContent = photoTitle;
  openPopup(popupPhotoCard, selectors);
}

          // вывод окна редактирования профиля на экран
function openPopupEditProfile(selectors) {
  const profileName = document.querySelector(`.${selectors.classProfileTitle}`);
  const profileSelf = document.querySelector(`.${selectors.classProfileSubtitle}`);
  const popupEditProfile = document.querySelector(`.${selectors.classEditProfilePopup}`);
  const popupProfileName = popupEditProfile.querySelector(`.${selectors.classEditProfilePopupName}`);
  const popupProfileSelf = popupEditProfile.querySelector(`.${selectors.classEditProfilePopupYourself}`);
  popupProfileName.value = profileName.textContent;
  popupProfileSelf.value = profileSelf.textContent;
  openPopup(popupEditProfile, selectors);
}

          // установка слушателя на кнопку вызова окна редактирования профиля
export function activateButtonProfile(selectors){
  const buttonEdit = document.querySelector(`.${selectors.classEditProfileButton}`);
  buttonEdit.addEventListener('click', () => {
    openPopupEditProfile(selectors);
  });
};

// редактирование информации о пользователе в профиле

          //обработка запроса на редактирование профиля
function editProfile(event, selectors, popupEditProfile) {
  event.preventDefault();
  const profileName = document.querySelector(`.${selectors.classProfileTitle}`);
  const popupProfileName = popupEditProfile.querySelector(`.${selectors.classEditProfilePopupName}`);
  const profileSelf = document.querySelector(`.${selectors.classProfileSubtitle}`);
  const popupProfileSelf = popupEditProfile.querySelector(`.${selectors.classEditProfilePopupYourself}`);
  profileName.textContent = popupProfileName.value;
  profileSelf.textContent = popupProfileSelf.value;
  closePopup(popupEditProfile, selectors);
}

          //установка слушателя на отправку формы с данными для редактирования профиля
function prepareSubmitFormProfile(selectors) {
  const popupEditProfile = document.querySelector(`.${selectors.classEditProfilePopup}`);
  const formEditProfile = popupEditProfile.querySelector(`.${selectors.classFromPopup}`);
  formEditProfile.addEventListener('submit', (event) => {
    editProfile(event, selectors, popupEditProfile);
  });
}

// добавление новой карточки

          // обработка запроса пользователя на добавление новой карточки
function addCardUser(event, selectors, popupAddCard, formAddCard) {
  event.preventDefault();
  addNewCard(formAddCard.link.value, formAddCard.title.value, selectors);
  closePopup(popupAddCard, selectors);
  formAddCard.reset();
}

          // установка слушателя на отправку формы с данными для новой карточки
function prepareSubmitFormNewCard(popupAddCard, selectors) {
  const formAddCard = popupAddCard.querySelector(`.${selectors.classFromPopup}`);
  formAddCard.addEventListener('submit', (event) => {
    addCardUser(event, selectors, popupAddCard, formAddCard);
  });
}

          // установка слушателя на вызов окна добавления карточек
function activateButtonAddCard(selectors){
  const buttonAdd = document.querySelector(`.${selectors.classAddPhotoButton}`);
  const popupAddCard = document.querySelector(`.${selectors.classAddCardPopup}`);
  buttonAdd.addEventListener('click', function () {
    openPopup(popupAddCard, selectors);
  });
  prepareSubmitFormNewCard(popupAddCard, selectors);
};

export function startWorkingPopups(selectors) {
  activateButtonProfile(selectors);
  activateButtonAddCard(selectors);
  waitPopupClosingCommand(selectors);
  prepareSubmitFormProfile(selectors);
}
