import {openPopup} from './modal.js';

// удаление карточки по выбору пользователя
function removeCard (event, selectors) {
  const cardActive = event.target.closest(`.${selectors.classCard}`);
  cardActive.remove();
}

// добавление и удаление лайка
function likeToCard(event, selectors) {
  const likeButtonActive = event.target;
  likeButtonActive.classList.toggle(`${selectors.classLikeActive}`);
}

// активация модального окна для просмотра фотографии карточки
function openPhotoInPopup(event, selectors) {
  const photoUrl = event.target.src;
  const photoAlt = event.target.alt;
  const popupPhotoCard = document.querySelector(`.${selectors.classPopupPhoto}`);
  popupPhotoCard.querySelector(`.${selectors.classPhotoInPopup}`).src = photoUrl;
  popupPhotoCard.querySelector(`.${selectors.classPhotoInPopup}`).alt = photoAlt;
  popupPhotoCard.querySelector(`.${selectors.classTitleInPopupPhoto}`).textContent = photoAlt;
  openPopup(popupPhotoCard, selectors.classOpenedPopup);
}

// функция дополнения карточки на страницу
export function addNewCard(card, selectors) {
  const listCards = document.querySelector(`.${selectors.classListCards}`);
  listCards.prepend(card);
};

// функция создания новой карточки
export function createNewCard(link, name, selectors) {
  const cardEmpty = document.querySelector(selectors.selectorCardEmpty).content;
  const card = cardEmpty.cloneNode(true);
  card.querySelector(`.${selectors.classPhotoInCard}`).src = link;
  card.querySelector(`.${selectors.classPhotoInCard}`).alt = name;
  card.querySelector(`.${selectors.classCaptionInCard}`).textContent = name;
          // установка слушателя на лайк активной карточки
  card.querySelector(`.${selectors.classIconLikeButton}`).addEventListener('click', (event) => {
    likeToCard(event, selectors);
  });
          // установка слушателя на удаление карточки
  card.querySelector(`.${selectors.classIconTrashButton}`).addEventListener('click', (event) => {
    removeCard(event, selectors);
  });
          // установка слушателя на открытие фотографии активной карточки в модальном окне
  card.querySelector(`.${selectors.classPhotoInCard}`).addEventListener('click', (event) => {
    openPhotoInPopup(event, selectors);
  });
  addNewCard(card, selectors);
}
