import {openPhotoInPopup} from './modal.js';

// функция дополнения карточки на страницу
export function addNewCard(link, name, selectors) {
  const card = createNewCard(link, name, selectors);
  const listCards = document.querySelector(`.${selectors.classListCards}`);
  listCards.prepend(card);
}

// удаление карточки по выбору пользователя
function removeCard (event, selectors) {
  const cardActive = event.currentTarget.closest(`.${selectors.classCard}`);
  cardActive.remove();
}

// добавление и удаление лайка
function likeToCard(event, selectors) {
  const likeButtonActive = event.currentTarget;
  likeButtonActive.classList.toggle(`${selectors.classLikeActive}`);
}

// функция создания новой карточки
function createNewCard(link, name, selectors) {
  const cardEmpty = document.querySelector(selectors.selectorCardEmpty).content;
  const card = cardEmpty.cloneNode(true);
  card.querySelector(`.${selectors.classPhotoInCard}`).src = link;
  card.querySelector(`.${selectors.classPhotoInCard}`).alt = name;
  card.querySelector(`.${selectors.classCaptionInCard}`).textContent = name;
  // установка слушателя на лайк активной карточки
  const likeButton = card.querySelector(`.${selectors.classLikeInCard}`);
  likeButton.addEventListener('click', (event) => {
    likeToCard(event, selectors);
  });
  // установка слушателя на удаление активной карточки
  const trashButton = card.querySelector(`.${selectors.classButtonTrashInCard}`);
  trashButton.addEventListener('click', (event) => {
    removeCard(event, selectors);
  });
  // установка слушателя на открытие фотографии активной карточки в модальном окне
  const photoInCard = card.querySelector(`.${selectors.classPhotoInCard}`);
  photoInCard.addEventListener('click', openPhotoInPopup);
  return card;
}

export function cardFunctionality(photosCards, selectors) {

  // автоматическое заполнение карточками при загрузке
  for (let i = 0; i < photosCards.length; i++) {
    const link = photosCards[i].link;
    const name = photosCards[i].name;
    addNewCard(link, name, selectors);
  }
}
