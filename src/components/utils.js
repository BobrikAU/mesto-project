export const dataUser = {
  urlCohort: 'https://mesto.nomoreparties.co/v1/plus-cohort-9',
  token: '7f8d2163-5607-4805-9bb9-bec28100308e'
}

// списки используемых селекторов
export const selectorsForValidate = {
  classInputTextError: 'popup__input-text_error',
  classInputTextPopups: 'popup__input-text',
  classButtonSubmitDisabled: 'popup__submit_disabled',
  classFromPopup: 'popup__form',
  classButtonSubmit: 'popup__submit'
}

export const selectorsForModal = {
  classOpenedPopup: 'popup_opened',
  classImgInCloseButton: 'button__icon-close',
}

export const selectorsForCard = {
  classOpenedPopup: 'popup_opened',
  classCard: 'photos__item',
  classLikeActive: 'button__icon-like_aktive',
  classPhotoInCard: 'photos__photo',
  classCaptionInCard: 'photos__caption',
  classIconLikeButton: 'button__icon-like',
  classTrashButton: 'button_function_trash',
  classNummerLikes: 'photos__nummer-likes'
}

export const selectorsForIndex = {
  classInputTextError: 'popup__input-text_error',
  classSpanWithInputError: 'popup__input-error',
  classInputTextPopups: 'popup__input-text',
  classButtonSubmitDisabled: 'popup__submit_disabled',
  classFromPopup: 'popup__form',
  classButtonSubmit: 'popup__submit',
  classOpenedPopup: 'popup_opened',
  classEditProfileButton: 'profile__edit-button',
  classAddPhotoButton: 'profile__add-button',
  classAddCardPopup: 'popup__add-card',
  classPopup: 'popup',
  classLikeActive: 'button__icon-like_aktive',
  classAvatarContainer: 'profile__avatar-container'
};

const selectors = {
  classPopupPhoto: 'popup_photo',
  classPhotoInPopup: 'popup__photo',
  classTitleInPopupPhoto: 'popup__title_photo',
  classListCards: 'photos__list',
  selectorCardEmpty: '#empty-item',
  classProfileTitle: 'profile__title',
  classProfileSubtitle: 'profile__subtitle',
  classEditProfilePopup: 'popup__edit-profile',
  classEditProfilePopupName: 'popup__name-field',
  classEditProfilePopupYourself: 'popup__field-yourself',
  classButtonSubmit: 'popup__submit',
  classPopupEditAvatar: 'popup__edit-avatar',
  classProfileAvatar: 'profile__avatar'
}

export const popupPhotoCard = document.querySelector(`.${selectors.classPopupPhoto}`);
export const photoInPopup = popupPhotoCard.querySelector(`.${selectors.classPhotoInPopup}`);
export const titleInPopupPhoto = popupPhotoCard.querySelector(`.${selectors.classTitleInPopupPhoto}`);
export const listCards = document.querySelector(`.${selectors.classListCards}`);
export const cardEmpty = document.querySelector(selectors.selectorCardEmpty).content;
export const profileName = document.querySelector(`.${selectors.classProfileTitle}`);
export const profileSelf = document.querySelector(`.${selectors.classProfileSubtitle}`);
export const profileAvatar = document.querySelector(`.${selectors.classProfileAvatar}`);
export const popupEditProfile = document.querySelector(`.${selectors.classEditProfilePopup}`);
export const popupProfileName = popupEditProfile.querySelector(`.${selectors.classEditProfilePopupName}`);
export const popupProfileSelf = popupEditProfile.querySelector(`.${selectors.classEditProfilePopupYourself}`);
export const buttonSubmitProfile = popupEditProfile.querySelector(`.${selectors.classButtonSubmit}`);
export const popupEditAvatar = document.querySelector(`.${selectors.classPopupEditAvatar}`);

/*export const photosCards = [
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
];*/


