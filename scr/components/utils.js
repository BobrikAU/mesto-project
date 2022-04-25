
//дезактивация кнопки отправки формы
export const makeButtonInactive = (buttonSubmit, selector) => {
    buttonSubmit.classList.add(selector);
    buttonSubmit.setAttribute('disabled', 'yes');
}

