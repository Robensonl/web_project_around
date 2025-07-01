export class FormValidator {
    constructor(config, formElement) {
      // Almacena la configuración y el formulario
      this._config = config;
      this._formElement = formElement;
      
      
      // Obtiene todos los inputs del formulario
      this._inputList = Array.from(
        this._formElement.querySelectorAll(this._config.inputSelector)
      );
      
      // Obtiene el botón de submit del formulario
      this._submitButton = this._formElement.querySelector(
        this._config.submitButtonSelector
      );
    }
  
    // Método privado para mostrar errores de validación
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.name}-error`
      );
      
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);
    }
  
    // Método privado para ocultar errores de validación
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.name}-error`
      );
      
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._config.errorClass);
    }
  
    // Método privado para validar un input
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    // Método privado para verificar si hay inputs inválidos
    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }
  
    // Método privado para cambiar el estado del botón de submit
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._submitButton.classList.add(this._config.inactiveButtonClass);
        this._submitButton.disabled = true;
      } else {
        this._submitButton.classList.remove(this._config.inactiveButtonClass);
        this._submitButton.disabled = false;
      }
    }
  
    // Método privado para configurar los event listeners
    _setEventListeners() {
      // Validación en tiempo real para cada input
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
      
      // Validación inicial al cargar el formulario
      this._toggleButtonState();
    }
  
    // Método público para habilitar la validación del formulario
    enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      
      this._setEventListeners();
    }
  
    // Método público para resetear la validación
    resetValidation() {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
      
      this._toggleButtonState();
    }
  }