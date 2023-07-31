import './../pages/index.css';
import {selectorsForIndex as selectors,
        selectorsForValidate,
        profileName,
        profileSelf,
        popupEditProfile,
        popupProfileName,
        popupProfileSelf,
        listCards,
        buttonSubmitProfile,
        profileAvatar,
        dataUser,
        popupEditAvatar,
        buttonEditAvatar,
        inputPopupEditAvatar} from './utils.js';
import {enableValidation,
        clearErrors,
        makeButtonInactive} from './validate.js';
import {openPopup,
        closePopup,
        closeWithButtonOderClickingOverlay} from './modal.js';
import {createNewCard} from './card.js';
import {uploadProfile,
        uploadСards,
        requestProfileEditing,
        requestAddCard,
        requestEditAvatar} from './api.js';

//вывод загруженной информации о пользователе на экран
function makeProfilSection(user) {
  profileName.textContent = user.name;
  dataUser.id = user._id;
  profileSelf.textContent = user.about;
  profileAvatar.src = user.avatar;
  profileAvatar.alt = `аватар ${user.name}`;
}

//формирование карточек
function makeCards(photosCards) {
  photosCards.forEach((item) => {
    const link = item.link;
    const imgAlt = `Изображение ${item.name}`;
    const name = item.name;
    const ownersId = item.owner._id;
    const nummerLikes = item.likes.length;
    const cardId = item._id;
    let activeLike = undefined;
    if (item.likes.some(item => item._id === dataUser.id)) {
      activeLike = `${selectors.classLikeActive}`;
    }
    const card = createNewCard(name, imgAlt, link, ownersId, cardId, nummerLikes, activeLike);
    addNewCard(card);
  });
}

//Инициация запроса информации о пользователе и карточках
Promise.all([uploadProfile, uploadСards])
  .then((results) => {
    makeProfilSection(results[0]);
    makeCards(results[1]);
  })
  .catch((err) => {
    if (typeof(err) === 'string') {
      profileName.textContent = err;
    }else{
      profileName.textContent = 'Что-то не так';
    }
    profileSelf.textContent = 'Попробуйте перезагрузить страницу';
  })

// вывод окна редактирования профиля на экран
function openPopupEditProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileSelf.value = profileSelf.textContent;
  makeButtonInactive(buttonSubmitProfile, selectors.classButtonSubmitDisabled);
  clearErrors(popupEditProfile,
              selectors.classSpanWithInputError,
              selectors.classInputTextPopups,
              selectors.classInputTextError)
  openPopup(popupEditProfile);
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
  buttonSubmitProfile.textContent = 'Сохранение...';
  requestProfileEditing(popupProfileName.value, popupProfileSelf.value)
    .then((newProfile) => {
      profileName.textContent = newProfile.name;
      profileSelf.textContent = newProfile.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitProfile.textContent = 'Сохранить';
    })
}

          //установка слушателя на отправку формы с данными для редактирования профиля
(function prepareSubmitFormProfile() {
  const formEditProfile = popupEditProfile.querySelector(`.${selectors.classFromPopup}`);
  formEditProfile.addEventListener('submit', (event) => {
    editProfile(event);
  });
})();

// добавление новой карточки

          // функция дополнения карточки на страницу
function addNewCard(card) {
  listCards.prepend(card);
};

          // обработка запроса пользователя на добавление новой карточки
function addCardUser(event, popupAddCard, formAddCard, buttonSubmitCard) {
  event.preventDefault();
  buttonSubmitCard.textContent = 'Сохранение...';
  requestAddCard(formAddCard.title.value, formAddCard.link.value)
    .then((objectNewCard) => {
      const card = createNewCard(objectNewCard.name,
                                 `Изображение ${objectNewCard.name}`,
                                 objectNewCard.link,
                                 objectNewCard.owner._id,
                                 objectNewCard._id,
                                 objectNewCard.likes.length);
      addNewCard(card);
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitCard.textContent = 'Сохранить';
    })
}

          // установка слушателя на отправку формы с данными для новой карточки
function prepareSubmitFormNewCard(popupAddCard, formAddCard, buttonSubmitCard) {
  formAddCard.addEventListener('submit', (event) => {
    addCardUser(event, popupAddCard, formAddCard, buttonSubmitCard);
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
    clearErrors(popupAddCard,
                selectors.classSpanWithInputError,
                selectors.classInputTextPopups,
                selectors.classInputTextError);
    openPopup(popupAddCard);
  });
  prepareSubmitFormNewCard(popupAddCard, formAddCard, buttonSubmitCard);
})();

// установка слушателей на закрытие модальных окон нажатием на кнопку закрытия попапа и оверлей
(function waitPopupClosingCommand() {
  const popups = document.querySelectorAll(`.${selectors.classPopup}`);
  popups.forEach( (item) => {
    item.addEventListener('click', (event) => {
      closeWithButtonOderClickingOverlay(event);
    });
  });
})();

//установка слушателя на вызов окна редактирования аватара пользователя
document.querySelector(`.${selectors.classAvatarContainer}`).addEventListener('click', () => {
  const formEditAvatar = popupEditAvatar.querySelector(`.${selectors.classFromPopup}`);
  makeButtonInactive(buttonEditAvatar, selectors.classButtonSubmitDisabled);
  formEditAvatar.reset();
  clearErrors(popupEditAvatar,
              selectors.classSpanWithInputError,
              selectors.classInputTextPopups,
              selectors.classInputTextError);
  openPopup(popupEditAvatar);
});

//отработка события отправки формы редактирования аватара пользователя
function editAvatar(event) {
  event.preventDefault();
  buttonEditAvatar.textContent = 'Сохранение...';
  const avatarURL = inputPopupEditAvatar.value;
  requestEditAvatar(avatarURL)
    .then((objectUser) => {
      profileAvatar.src = objectUser.avatar;
      profileAvatar.onload = closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonEditAvatar.textContent = 'Сохранить';
    })
}

//установка слушателя на отправку формы модального окна редактирования аватара
popupEditAvatar.querySelector(`.${selectors.classFromPopup}`).addEventListener('submit', editAvatar)

//валидация форм, запуск кода модуля validate
enableValidation(selectorsForValidate);


