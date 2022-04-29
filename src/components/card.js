import {openPhotoInPopup} from './modal.js';
import {addNewCard} from './utils.js';

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
    if (event.target.classList.contains(`${selectors.classIconTrashButton}`)) {
      removeCard(event, selectors);
    }
  });

  // установка слушателя на лайк активной карточки
  galleryPhotos.addEventListener('click', (event) => {
    if (event.target.classList.contains(`${selectors.classIconLikeButton}`)) {
      likeToCard(event, selectors);
    }
  });

  // установка слушателя на открытие фотографии активной карточки в модальном окне
  galleryPhotos.addEventListener('click', (event) => {
    if (event.target.classList.contains(`${selectors.classPhotoInCard}`)) {
      openPhotoInPopup(event, selectors);
    }
  });
}
