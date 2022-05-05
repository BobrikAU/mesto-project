import './../pages/index.css';
import {selectorsForIndex as selectors,
        selectorsForValidate,
        photosCards,
        profileName,
        profileSelf,
        popupEditProfile,
        popupProfileName,
        popupProfileSelf,
        listCards,
        buttonSubmitProfile,
        profileAvatar} from './utils.js';
import {enableValidation,
        clearErrors,
        makeButtonInactive} from './validate.js';
import {openPopup,
        closePopup,
        closeWithButtonOderClickingOverlay} from './modal.js';
import {createNewCard} from './card.js';
import {makeProfilSection} from './api.js';

//загрузка информации о пользователе с сервера и вывод на экран
makeProfilSection()
  .then((user) => {
    profileName.textContent = user.name;
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

          // функция дополнения карточки на страницу
function addNewCard(card) {
  listCards.prepend(card);
};

          // обработка запроса пользователя на добавление новой карточки
function addCardUser(event, popupAddCard, formAddCard) {
  event.preventDefault();
  const card = createNewCard(formAddCard.link.value, formAddCard.title.value);
  addNewCard(card);
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
    clearErrors(popupAddCard, selectors.classSpanWithInputError, selectors.classInputTextPopups, selectors.classInputTextError);
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

// автоматическое заполнение карточками при загрузке
for (let i = 0; i < photosCards.length; i++) {
  const link = photosCards[i].link;
  const name = photosCards[i].name;
  const card = createNewCard(link, name);
  addNewCard(card)
}

//валидация форм, запуск кода модуля validate
enableValidation(selectorsForValidate);


