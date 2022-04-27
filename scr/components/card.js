import {openPhotoInPopup} from './modal.js';

// функция дополнения карточки на страницу
export function addNewCard(link, name, selectors) {
  const card = createNewCard(link, name, selectors);
  const listCards = document.querySelector(`.${selectors.classListCards}`);
  listCards.prepend(card);
}

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

// функция создания новой карточки
function createNewCard(link, name, selectors) {
  const cardEmpty = document.querySelector(selectors.selectorCardEmpty).content;
  const card = cardEmpty.cloneNode(true);
  card.querySelector(`.${selectors.classPhotoInCard}`).src = link;
  card.querySelector(`.${selectors.classPhotoInCard}`).alt = name;
  card.querySelector(`.${selectors.classCaptionInCard}`).textContent = name;
  return card;
}

export function cardFunctionality(photosCards, selectors) {

  // автоматическое заполнение карточками при загрузке
  for (let i = 0; i < photosCards.length; i++) {
    const link = photosCards[i].link;
    const name = photosCards[i].name;
    addNewCard(link, name, selectors);
  }

  // установка слушателя на удаление карточки
  const galleryPhotos = document.querySelector(`.${selectors.classGalleryPhotos}`);
  galleryPhotos.addEventListener('click', (event) => {
    if (event.target.classList.contains('button__icon-trash')) {
      removeCard(event, selectors);
    }
  });

  // установка слушателя на лайк активной карточки
  galleryPhotos.addEventListener('click', (event) => {
    if (event.target.classList.contains('button__icon-like')) {
      likeToCard(event, selectors);
    }
  });

  // установка слушателя на открытие фотографии активной карточки в модальном окне
  galleryPhotos.addEventListener('click', (event) => {
    if (event.target.classList.contains('photos__photo')) {
      openPhotoInPopup(event);
    }
  });
}
