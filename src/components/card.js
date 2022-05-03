import {openPopup} from './modal.js';
import {selectorsForCard as selectors, popupPhotoCard, photoInPopup, titleInPopupPhoto, listCards, cardEmpty} from './utils.js';

// удаление карточки по выбору пользователя
function removeCard (event) {
  const cardActive = event.target.closest(`.${selectors.classCard}`);
  cardActive.remove();
}

// добавление и удаление лайка
function likeToCard(event) {
  const likeButtonActive = event.target;
  likeButtonActive.classList.toggle(`${selectors.classLikeActive}`);
}

// активация модального окна для просмотра фотографии карточки
function openPhotoInPopup(event) {
  const photoUrl = event.target.src;
  const photoAlt = event.target.alt;
  photoInPopup.src = photoUrl;
  photoInPopup.alt = photoAlt;
  titleInPopupPhoto.textContent = photoAlt;
  openPopup(popupPhotoCard, selectors.classOpenedPopup);
}

// функция дополнения карточки на страницу
export function addNewCard(card) {
  listCards.prepend(card);
};

// функция создания новой карточки
export function createNewCard(link, name) {
  const card = cardEmpty.cloneNode(true);
  const photoInCard = card.querySelector(`.${selectors.classPhotoInCard}`);
  photoInCard.src = link;
  photoInCard.alt = name;
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
  photoInCard.addEventListener('click', (event) => {
    openPhotoInPopup(event, selectors);
  });
  addNewCard(card, selectors);
}
