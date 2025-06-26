import { Popup } from './Popup.js';

/**
 * Clase para popups que contienen formularios
 * Extiende funcionalidad base de Popup
 */
export class PopupWithForm extends Popup {
  /**
   * @param {string} popupSelector - Selector CSS del popup
   * @param {Function} handleFormSubmit - Callback para submit del formulario
   */
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__button');
  }

  /**
   * Recoge valores de todos los inputs del formulario
   * @returns {Object} Valores en formato { inputName: value }
   */
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  /**
   * Establece valores en los inputs del formulario
   * @param {Object} data - Datos en formato { inputName: value }
   */
  setInputValues(data) {
    this._inputList.forEach(input => {
    //  input.value = data[input.name] || '';
    });
  }

  /**
   * Agrega listener para submit del formulario
   */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  /**
   * Cierra el popup y resetea el formulario
   */
  close() {
    super.close();
    this._form.reset();
  }
}