//дезактивация кнопки отправки формы
export const makeButtonInactive = (buttonSubmit, selector) => {
  buttonSubmit.classList.add(selector);
  buttonSubmit.setAttribute('disabled', 'yes');
}

export function enableValidation(selectors) {
  //показываем сообщение об ошибке в элементе span
  const schowError = (input, spanWithErrorMessage) => {
    input.classList.add(selectors.classInputTextError);
    const errorMessageInput = input.validationMessage;
    spanWithErrorMessage.textContent = errorMessageInput;
  }

  //убираем сообщение об ошибке в элементе span
  const hideError = (input, spanWithErrorMessage) => {
    input.classList.remove(selectors.classInputTextError);
    spanWithErrorMessage.textContent = '';
  }

  //общая проверка на валидность всех полей ввода, отправляемых одной кнопкой
  const checkValidityAllInputs = inputs => {
    const result = inputs.every(function(item) {
      return item.validity.valid
    });
    return result;
  }

  //активация кнопки отправки формы
  const makeButtonActive = (form, buttonSubmit) => {
    const inputs = Array.from(form.querySelectorAll(`.${selectors.classInputTextPopups}`));
    if (checkValidityAllInputs(inputs)) {
      buttonSubmit.classList.remove(selectors.classButtonSubmitDisabled);
      buttonSubmit.removeAttribute('disabled');
    }
  }

  //оценка текста в поле ввода на валидность стандартными методами браузера
  const reveiwInput = event => {
    const input = event.target;
    const form = event.target.closest(`.${selectors.classFromPopup}`);
    const spanWithErrorMessage = form.querySelector(`.popup__input-error-${input.name}`);
    const buttonSubmit = form.querySelector(`.${selectors.classButtonSubmit}`);
    if (!input.validity.valid) {
      schowError(input, spanWithErrorMessage);
      makeButtonInactive(buttonSubmit, selectors.classButtonSubmitDisabled);
    } else {
      hideError(input, spanWithErrorMessage);
      makeButtonActive(form, buttonSubmit);
    }
  }

  //установка слушателей на нажатие клавиш клавиатуры в полях ввода
  function validateForms() {
    const inputs = document.querySelectorAll(`.${selectors.classInputTextPopups}`);
    inputs.forEach( input => {
      input.addEventListener('input', reveiwInput);
    });
  };

  validateForms();
}
