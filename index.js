const addButton = document.querySelector('.profile__add-button'); //кнопка добавления фотографий
const editButton = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const profilePopup = document.querySelector('.popup'); //диалоговое окно редактирования профиля
const closeButton = document.querySelector('.popup__close-button'); //кнопка закрытия диалогового окна
const profileName = document.querySelector('.profile__title'); //заголовок с именем пользователя в профиле
const popupProfileName = document.querySelector('[name=name]'); //поле для введения имени пользователя в модальном окне редактирования профиля
const ProfileSelf = document.querySelector('.profile__subtitle'); //подзаголовок с информацией о пользователе в профиле
const popupProfileSelf = document.querySelector('[name=about-self]'); //поле для информации о пользователе в модальном окне редактирования профиля
const formElement = document.querySelector('.popup__form'); //форма отправки данных для профиля пользователя

//обработчик закрытия модального окна
function closePopup() {
  profilePopup.className = 'popup';
}

//обработчик отправки формы
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  ProfileSelf.textContent = popupProfileSelf.value;
  closePopup();
}

//открытие модального окна
editButton.addEventListener('click', function() {
  popupProfileName.removeAttribute('placeholder');
  popupProfileName.setAttribute('value', profileName.textContent);
  popupProfileSelf.removeAttribute('placeholder');
  popupProfileSelf.setAttribute('value', ProfileSelf.textContent);
  profilePopup.className = 'popup popup_opened';
});

//закрытие модального окна
closeButton.addEventListener('click', closePopup);

//сохранение изменений в профиле пользователя из формы
formElement.addEventListener('submit', formSubmitHandler);


