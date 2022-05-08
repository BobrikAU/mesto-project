import './../pages/index.css';
import {selectorsForIndex as selectors,
        selectorsForValidate,
        //photosCards,
        profileName,
        profileSelf,
        popupEditProfile,
        popupProfileName,
        popupProfileSelf,
        listCards,
        buttonSubmitProfile,
        profileAvatar,
        dataUser,
        popupEditAvatar} from './utils.js';
import {enableValidation,
        clearErrors,
        makeButtonInactive} from './validate.js';
import {openPopup,
        closePopup,
        closeWithButtonOderClickingOverlay} from './modal.js';
import {createNewCard} from './card.js';
import {uploadProfilSection,
        uploadСards,
        requestProfileEditing,
        requestAddCard,
        requestEditAvatar} from './api.js';

//загрузка информации о пользователе с сервера и вывод на экран
function makeProfilSection() {
  uploadProfilSection()
    .then((user) => {
      profileName.textContent = user.name;
      dataUser.id = user._id;
      profileSelf.textContent = user.about;
      profileAvatar.src = user.avatar;
      profileAvatar.alt = `аватар ${user.name}`;
    })
    .catch((err) => {
      if (typeof(err) === 'string') {
        profileName.textContent = err;
      }else{
        profileName.textContent = 'Что-то не так';
      }
      profileSelf.textContent = 'Попробуйте перезагрузить страницу';
    });
}

//автоматическая загрузка 6 карточек при загрузке
function makeCards() {
  uploadСards ()
    .then((photosCards) => {
      let nummers = [];
      while (nummers.length < 6) {
        const nummer = Math.floor(Math.random() * photosCards.length)
        if (!nummers.some( item => item === nummer)) {
          const link = photosCards[nummer].link;
          const imgAlt = `Изображение ${photosCards[nummer].name}`;
          const name = photosCards[nummer].name;
          const ownersId = photosCards[nummer].owner._id;
          const nummerLikes = photosCards[nummer].likes.length;
          const cardId = photosCards[nummer]._id;
          let activeLike = undefined;
          if (photosCards[nummer].likes.some(item => item._id === dataUser.id)) {
            activeLike = `${selectors.classLikeActive}`;
          }
          const card = createNewCard(name, imgAlt, link, ownersId, cardId, nummerLikes, activeLike);
          addNewCard(card);
          nummers.push(nummer);
        }
      }
    })
    .catch(() => {
      const name = 'Перезагрузите страницу';
      const imgAlt = 'Что-то пошло не так. Перезагрузите страницу';
      const card = createNewCard(name, imgAlt);
      addNewCard(card);
    })
}

//определение последовательности действий при загрузке
Promise.resolve()
  .then(() => {
    makeProfilSection();
  })
  .then(() => {
    makeCards();
  });

// вывод окна редактирования профиля на экран
function openPopupEditProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileSelf.value = profileSelf.textContent;
  makeButtonInactive(buttonSubmitProfile, selectors.classButtonSubmitDisabled);
  clearErrors(popupEditProfile, selectors.classSpanWithInputError, selectors.classInputTextPopups, selectors.classInputTextError)
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
  requestProfileEditing(popupProfileName.value, popupProfileSelf.value)
    .then((newProfile) => {
      profileName.textContent = newProfile.name;
      profileSelf.textContent = newProfile.about;
      closePopup(popupEditProfile);
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
function addCardUser(event, popupAddCard, formAddCard) {
  event.preventDefault();
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
    clearErrors(popupAddCard,
                selectors.classSpanWithInputError,
                selectors.classInputTextPopups,
                selectors.classInputTextError);
    openPopup(popupAddCard);
  });
  prepareSubmitFormNewCard(popupAddCard, formAddCard);
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
  const buttonEditAvatar = popupEditAvatar.querySelector(`.${selectors.classButtonSubmit}`);
  const formEditAvatar = popupEditAvatar.querySelector(`.${selectors.classFromPopup}`);
  makeButtonInactive(buttonEditAvatar, selectors.classButtonSubmitDisabled);
  formEditAvatar.reset();
  clearErrors(popupEditAvatar,
              selectors.classSpanWithInputError,
              selectors.classInputTextPopups,
              selectors.classInputTextError);
  openPopup(popupEditAvatar);
});

function editAvatar(event) {
  event.preventDefault();
  const avatarURL = popupEditAvatar.querySelector(`.${selectors.classInputTextPopups}`).value;
  requestEditAvatar(avatarURL)
    .then((objectUser) => {
      profileAvatar.src = objectUser.avatar;
      profileAvatar.onload = closePopup(popupEditAvatar);
    })
}

//установка слушателя на отправку формы модального окна редактирования аватара
popupEditAvatar.querySelector(`.${selectors.classFromPopup}`).addEventListener('submit', editAvatar)

//валидация форм, запуск кода модуля validate
enableValidation(selectorsForValidate);


