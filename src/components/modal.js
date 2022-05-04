import {selectorsForModal as selectors} from './utils.js';

//закрытие модальных окон

          //непосредственное закрытие модального окна
export function closePopup(popup) {
  document.removeEventListener('keydown', closePopupKeyESC);
  popup.classList.remove(selectors.classOpenedPopup);
}

          //активация закрытия попапа кнопкой escape
function closePopupKeyESC(event) {
  if (event.key === 'Escape') {
    const popupActive = document.querySelector(`.${selectors.classOpenedPopup}`);
    closePopup (popupActive);
  }
}
          //установка слушателя на закрытие попапа клавишей ESC
function waitPopupClosingCommandEsc () {
  document.addEventListener('keydown', closePopupKeyESC);
}

          //активация закрытия модального окна нахатием мыши на оверлей или на кнопку в самом попапе
export function closeWithButtonOderClickingOverlay(event) {
  if (event.target === event.currentTarget || event.target.classList.contains(`${selectors.classImgInCloseButton}`)) {
    closePopup(event.currentTarget);
  }
}

//открытие модальных окон

          // непосредственное открытие модального окна
export function openPopup (popup) {
  popup.classList.add(selectors.classOpenedPopup);
  waitPopupClosingCommandEsc ();
}

