import {selectors} from './utils.js';

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

          // активация закрытия модального окна нажатием мышью на оверлей
export function closePopupClickingOverlay(event, selectors) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

          //активация закрытия попапа кнопкой в самом попапе
export function closeWithButton(event, selectors) {
  if (event.target.classList.contains(`${selectors.classImgInCloseButton}`)) {
    const popupActive = document.querySelector(`.${selectors.classOpenedPopup}`);
    closePopup(popupActive);
  }
}

//открытие модальных окон

          // непосредственное открытие модального окна
export function openPopup (popup, selector) {
  popup.classList.add(selector);
  waitPopupClosingCommandEsc ();
}

          //очистка элементов span от сообщений об ошиках и снятие классов ошибок с input
export function clearErrors(popup, selectors) {
  popup.querySelectorAll('.popup__input-error').forEach( item => {
    item.textContent = '';
  });
  popup.querySelectorAll(`.${selectors.classInputTextPopups}`).forEach( item => {
    item.classList.remove(selectors.classInputTextError);
  });
}

