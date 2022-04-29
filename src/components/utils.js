// список используемых селекторов
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
  classGalleryPhotos: 'photos',
  classProfileTitle: 'profile__title',
  classProfileSubtitle: 'profile__subtitle',
  classEditProfileButton: 'profile__edit-button',
  classEditProfilePopup: 'popup__edit-profile',
  classEditProfilePopupName: 'popup__name-field',
  classEditProfilePopupYourself: 'popup__field-yourself',
  classAddPhotoButton: 'profile__add-button',
  classAddCardPopup: 'popup__add-card',
  classIconTrashButton: 'button__icon-trash',
  classIconLikeButton: 'button__icon-like',
}

// функция создания новой карточки
function createNewCard(link, name, selectors) {
  const cardEmpty = document.querySelector(selectors.selectorCardEmpty).content;
  const card = cardEmpty.cloneNode(true);
  card.querySelector(`.${selectors.classPhotoInCard}`).src = link;
  card.querySelector(`.${selectors.classPhotoInCard}`).alt = name;
  card.querySelector(`.${selectors.classCaptionInCard}`).textContent = name;
  return card;
}

// функция дополнения карточки на страницу
export function addNewCard(link, name, selectors) {
  const card = createNewCard(link, name, selectors);
  const listCards = document.querySelector(`.${selectors.classListCards}`);
  listCards.prepend(card);
}

//дезактивация кнопки отправки формы
export const makeButtonInactive = (buttonSubmit, selector) => {
    buttonSubmit.classList.add(selector);
    buttonSubmit.setAttribute('disabled', 'yes');
}

