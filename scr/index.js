
// установка слушателей на кнопку закрытия модального окна
import {closeWithButton} from './components/modal.js';
(function(){
  const buttonsClose = document.querySelectorAll('.popup__close-button');
  buttonsClose.forEach( function (button) {
    button.addEventListener('click', closeWithButton);
  });
})();

// установка слушателя на вызов окна добавления карточек
import {openPopup} from './components/modal.js';
import {prepareSubmitFormNewCard} from './components/modal.js';
(function(){
  const buttonAdd = document.querySelector('.profile__add-button');
  const popupAddCard = document.querySelector('.popup__add-card');
  buttonAdd.addEventListener('click', function () {
    openPopup(popupAddCard);
    prepareSubmitFormNewCard()
  });
})();

// установка слушателя на вызов окна редактирования профиля
import {openPopupEditProfile} from './components/modal.js';
(function(){
  const buttonEdit = document.querySelector('.profile__edit-button');
  buttonEdit.addEventListener('click', openPopupEditProfile);
})();

//работа карточек
import {cardFunctionality} from './components/card.js';
export const selectors = {
  classListCards: 'photos__list',
  classPhotoInCard: 'photos__photo',
  classCaptionInCard: 'photos__caption',
  classLikeInCard: 'photos__like-button',
  classButtonTrashInCard: 'button_function_trash',
  selectorCardEmpty: '#empty-item',
  classLikeActive: 'button__icon-like_aktive',
  classCard: 'photos__item'
}
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
import {enableValidation} from './components/validate.js';
enableValidation({
  classInputTextPopups: 'popup__input-text',
  classButtonSubmit: 'popup__submit',
  classFromPopup: 'popup__form',
  classButtonSubmitDisabled: 'popup__submit_disabled',
  classInputTextError: 'popup__input-text_error'
});
