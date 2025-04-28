export function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach(form => {
      form.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      setEventListeners(form, config);
    });
  }
  
  function setEventListeners(form, config) {
    const inputs = Array.from(form.querySelectorAll('input'));
    const button = form.querySelector(config.submitButtonSelector);
  
    toggleButtonState(inputs, button, config);
  
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(form, input, config);
        toggleButtonState(inputs, button, config);
      });
    });
  }
  
  function checkInputValidity(form, input, config) {
    const errorElement = form.querySelector(`#${input.name}-error`);
    if (!input.validity.valid) {
      input.classList.add(config.inputErrorClass);
      if (errorElement) {
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(config.errorClass);
      }
    } else {
      input.classList.remove(config.inputErrorClass);
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove(config.errorClass);
      }
    }
  }
  
  function toggleButtonState(inputs, button, config) {
    const isValid = inputs.every(input => input.validity.valid);
    if (!isValid) {
      button.classList.add(config.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
    }
  }
  