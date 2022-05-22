import {openPopup,
        closePopup} from './modal.js';
import {selectorsForCard as selectors,
        popupPhotoCard,
        photoInPopup,
        titleInPopupPhoto,
        cardEmpty,
        dataUser,
        popupApprovalDelete,
        buttonApprovalDelete} from './utils.js';
import {deleteСard,
        addLike} from './api.js';

let cardActive = undefined;


// удаление карточки по выбору пользователя
export function removeCard() {
  deleteСard(cardActive)
    .then(() => {
      cardActive.remove();
      closePopup(popupApprovalDelete);
      buttonApprovalDelete.textContent = 'Да';
    })
    .catch((err) => {
      console.log(err);
    })
}

// добавление и удаление лайка
function likeToCard(event) {
  const likeButtonActive = event.target;
  let requestMethod = 'PUT';
  if (likeButtonActive.classList.contains(`${selectors.classLikeActive}`)) {
    requestMethod = 'DELETE';
  }
  const cardActive = event.target.closest(`.${selectors.classCard}`);
  addLike(cardActive, requestMethod)
    .then((res) => {
      likeButtonActive.classList.toggle(`${selectors.classLikeActive}`);
      cardActive.querySelector(`.${selectors.classNummerLikes}`).textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
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
export function createNewCard(name, imgAlt, link, ownersId, cardId, nummerLikes, activeLike) {
  const card = cardEmpty.cloneNode(true);
  const photoInCard = card.querySelector(`.${selectors.classPhotoInCard}`);
  photoInCard.src = link;
  photoInCard.alt = imgAlt;
  card.querySelector(`.${selectors.classNummerLikes}`).textContent = nummerLikes;
  card.querySelector(`.${selectors.classCaptionInCard}`).textContent = name;
  const newCard = card.querySelector(`.${selectors.classCard}`);
  newCard.setAttribute('owners_id', ownersId);
  newCard.setAttribute('card_id', cardId);
  const imgLikeInButton = card.querySelector(`.${selectors.classIconLikeButton}`);
  if (activeLike) {
    imgLikeInButton.classList.add(activeLike);
  }
          // установка слушателя на лайк активной карточки
  imgLikeInButton.addEventListener('click', (event) => {
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
      cardActive = event.target.closest(`.${selectors.classCard}`);
      openPopup(popupApprovalDelete, cardActive);
//      removeCard(event);
    });
  }
  return card;
}
