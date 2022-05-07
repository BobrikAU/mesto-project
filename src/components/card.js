import {openPopup} from './modal.js';
import {selectorsForCard as selectors,
        popupPhotoCard,
        photoInPopup,
        titleInPopupPhoto,
        cardEmpty,
        dataUser} from './utils.js';
import {deleteСard} from './api.js';

// удаление карточки по выбору пользователя
function removeCard (event) {
  const cardActive = event.target.closest(`.${selectors.classCard}`);
  deleteСard(cardActive)
    .then(() => {
      cardActive.remove();
    })
}

// добавление и удаление лайка
function likeToCard(event) {
  const likeButtonActive = event.target;
  likeButtonActive.classList.toggle(`${selectors.classLikeActive}`);
}

// активация модального окна для просмотра фотографии карточки
function openPhotoInPopup(event, name) {
  const photoUrl = event.target.src;
  const photoAlt = event.target.alt;
  photoInPopup.src = photoUrl;
  photoInPopup.alt = photoAlt;
  titleInPopupPhoto.textContent = name;
  openPopup(popupPhotoCard);
}

// функция создания новой карточки
export function createNewCard(name, imgAlt, link, ownersId, cardId, nummerLikes) {
  const card = cardEmpty.cloneNode(true);
  const photoInCard = card.querySelector(`.${selectors.classPhotoInCard}`);
  photoInCard.src = link;
  photoInCard.alt = imgAlt;
  card.querySelector(`.${selectors.classNummerLikes}`).textContent = nummerLikes;
  card.querySelector(`.${selectors.classCaptionInCard}`).textContent = name;
  const newCard = card.querySelector(`.${selectors.classCard}`);
  newCard.setAttribute('owners_id', ownersId);
  newCard.setAttribute('card_id', cardId);
          // установка слушателя на лайк активной карточки
  card.querySelector(`.${selectors.classIconLikeButton}`).addEventListener('click', (event) => {
    likeToCard(event, selectors);
  });
          // установка слушателя на открытие фотографии активной карточки в модальном окне
  photoInCard.addEventListener('click', (event) => {
    openPhotoInPopup(event, name);
  });
  if (newCard.getAttribute('owners_id') === dataUser.id) {
    const trashButton = card.querySelector(`.${selectors.classTrashButton}`);
    trashButton.classList.remove('button_hidden');
          // установка слушателя на удаление карточки
    trashButton.addEventListener('click', (event) => {
      removeCard(event, selectors);
    });
  }
  return card;
}
