
const buttonEdit = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const popupEditProfile = document.querySelector('.popup__edit-profile'); // модальное окно редактирования профиля
const formEditProfile = popupEditProfile.querySelector('.popup__form'); // форма отправки данныйх для редактирования профиля пользователя
const popupProfileName = popupEditProfile.querySelector('.popup__name-field'); //поле для введения имени пользователя в модальном окне редактирования профиля
const popupProfileSelf = popupEditProfile.querySelector('.popup__field-yourself'); //поле для информации о пользователе в модальном окне редактирования профиля
const profileName = document.querySelector('.profile__title'); //заголовок с именем пользователя в профиле
const profileSelf = document.querySelector('.profile__subtitle'); //подзаголовок с информацией о пользователе в профиле
const buttonAdd = document.querySelector('.profile__add-button'); // кнопка добавления карточек
const popupAddCard = document.querySelector('.popup__add-card'); // модальное окно добавления карточек
const formAddCard = popupAddCard.querySelector('.popup__form') // форма отправки данных для новой карточки
const buttonsClose = document.querySelectorAll('.popup__close-button'); // список всех кнопок закрытия модальных окон
const cardEmpty = document.querySelector('#empty-item').content; // пустая карточка для фотографии
const listCards = document.querySelector('.photos__list'); // список карточек с фотографиями
const popupPhotoCard = document.querySelector('.popup_photo'); // модальное окно показа фотографий карточек

// фотографии для карточек при загрузке
const photosCards = [
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
];

// непосредственное открытие модального окна
function openPopup (popup) {
  popup.classList.add('popup_opened');
  openAdditionalWaysClosePopup(popup);
}

// непосредственное закрытие модального окна
function closePopupClickingOverlay(event) {
  closePopup(event.currentTarget);
}

function stopPropagation(event) {
  event.stopPropagation();
}

function closePopupKeyESC(event) {
  if (event.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup (popupActive);
  };
}

function openAdditionalWaysClosePopup(popup) {
  document.addEventListener('keydown', closePopupKeyESC);
  const containerPopup = popup.querySelector('.popup__container');
  containerPopup.addEventListener('click', stopPropagation);
  popup.addEventListener('click', closePopupClickingOverlay);
}

function closePopup(popup) {
  const containerPopup = popup.querySelector('.popup__container');
  containerPopup.removeEventListener('click', stopPropagation);
  popup.removeEventListener('click', closePopupClickingOverlay);
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeyESC);
}

// добавление и удаление лайка
function likeToCard(event) {
  const likeButtonActive = event.currentTarget;
  likeButtonActive.classList.toggle('button__icon-like_aktive');
}

// удаление карточки по выбору пользователя
function removeCard (event) {
  const cardActive = event.currentTarget.closest('.photos__item');
  cardActive.remove();
}

// активация модального окна для просмотра фотографии карточки
function openPhotoInPopup(event) {
  const photoUrl = event.target.src;
  const photoAlt = event.target.alt;
  const photoTitle = event.target.closest('.photos__item').querySelector('.photos__caption').textContent;
  popupPhotoCard.querySelector('.popup__photo').src = photoUrl;
  popupPhotoCard.querySelector('.popup__photo').alt = photoAlt;
  popupPhotoCard.querySelector('.popup__title_photo').textContent = photoTitle;
  openPopup(popupPhotoCard);
}

// функция создания новой карточки
function createNewCard(link, name) {
  const card = cardEmpty.cloneNode(true);
  card.querySelector('.photos__photo').src = link;
  card.querySelector('.photos__photo').alt = name;
  card.querySelector('.photos__caption').textContent = name;
  // установка слушателя на лайк активной карточки
  const likeButton = card.querySelector('.photos__like-button');
  likeButton.addEventListener('click', likeToCard);
  // установка слушателя на удаление активной карточки
  const trashButton = card.querySelector('.button_function_trash');
  trashButton.addEventListener('click', removeCard);
  // установка слушателя на открытие фотографии активной карточки в модальном окне
  const photoInCard = card.querySelector('.photos__photo');
  photoInCard.addEventListener('click', openPhotoInPopup);
  return card;
}

// функция дополнения карточки на страницу
function addNewCard(link, name) {
  const card = createNewCard(link, name);
  listCards.prepend(card);
}

// автоматическое заполнение карточками при загрузке
for (let i = 0; i < photosCards.length; i++) {
  const link = photosCards[i].link;
  const name = photosCards[i].name;
  addNewCard(link, name);
}

// вывод окна редактирования профиля на экран
function openPopupEditProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileSelf.value = profileSelf.textContent;
  openPopup(popupEditProfile);
}

// вызов окна редактирования профиля
buttonEdit.addEventListener('click', openPopupEditProfile);

// вызов окна добавления карточек
buttonAdd.addEventListener('click', function () {
  openPopup(popupAddCard);
});

// деактивация любого модального окна, данные не сохраняются
buttonsClose.forEach( function (button) {
  button.addEventListener('click', function (event) {
    event.stopPropagation();
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  });
});

// обработка запроса пользователя на добавление новой карточки
function addCardUser(event) {
  event.preventDefault();
  addNewCard(formAddCard.link.value, formAddCard.title.value);
  closePopup(popupAddCard);
  formAddCard.reset();
}

// активация добавления новой карточки пользователем
formAddCard.addEventListener('submit', addCardUser);

// редактирование информации о пользователе в профиле
formEditProfile.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileSelf.textContent = popupProfileSelf.value;
  closePopup(popupEditProfile);
});

//валидация форм
const schowError = (input, spanWithErrorMessage) => {
  input.classList.add('popup__input-text_error');
  const errorMessageInput = input.validationMessage;
  spanWithErrorMessage.textContent = errorMessageInput;
}

const hideError = (input, spanWithErrorMessage) => {
  input.classList.remove('popup__input-text_error');
  spanWithErrorMessage.textContent = '';
}

const makeButtonInactive = buttonSubmit => {
  buttonSubmit.classList.add('popup__submit_disabled');
  buttonSubmit.setAttribute('disabled', 'yes');
}

const checkValidityAllInputs = inputs => {
  const result = inputs.every(function(item) {
    return item.validity.valid
  });
  return result;
}

const makeButtonActive = (fieldset, buttonSubmit) => {
  const inputs = Array.from(fieldset.querySelectorAll('.popup__input-text'));
  if (checkValidityAllInputs(inputs)) {
    buttonSubmit.classList.remove('popup__submit_disabled');
    buttonSubmit.removeAttribute('disabled');
  }
}

const reveiwInput = event => {
  const input = event.target;
  const fieldset = event.target.closest('.popup__set');
  const spanWithErrorMessage = fieldset.querySelector(`.popup__input-error-${input.name}`);
  const buttonSubmit = fieldset.querySelector('.popup__submit');
  if (!input.validity.valid) {
    schowError(input, spanWithErrorMessage);
    makeButtonInactive(buttonSubmit);
  } else {
    hideError(input, spanWithErrorMessage);
    makeButtonActive(fieldset, buttonSubmit);
  }
}

function validateForms() {
  const inputs = document.querySelectorAll('.popup__input-text');
  inputs.forEach( input => {
    input.addEventListener('input', reveiwInput);
  });
}

validateForms();
