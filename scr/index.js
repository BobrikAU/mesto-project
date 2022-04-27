
export const selectors = {
  classListCards: 'photos__list',
  classPhotoInCard: 'photos__photo',
  classCaptionInCard: 'photos__caption',
  classLikeInCard: 'button__icon-like',
  classButtonTrashInCard: 'button_function_trash',
  selectorCardEmpty: '#empty-item',
  classLikeActive: 'button__icon-like_aktive',
  classButtonSubmitDisabled: 'popup__submit_disabled',
  classCard: 'photos__item',
  classOpenedPopup: 'popup_opened',
  classPopupPhoto: 'popup_photo',
  classPhotoInPopup: 'popup__photo',
  classTitleInPopupPhoto: 'popup__title_photo',
  classInputTextPopups: 'popup__input-text',
  classButtonSubmit: 'popup__submit',
  classFromPopup: 'popup__form',
  classInputTextError: 'popup__input-text_error',
  classPopup: 'popup',
  classImgInCloseButton: 'button__icon-close',
  classGalleryPhotos: 'photos'
}

import {startWorkingPopups} from './components/modal.js';
import {cardFunctionality} from './components/card.js';
import {enableValidation} from './components/validate.js';

//начало работы модальных окон
startWorkingPopups();

//добавление карточек
cardFunctionality([
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
], selectors);

//валидация форм
enableValidation(selectors);
