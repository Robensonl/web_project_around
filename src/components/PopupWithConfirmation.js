import { Popup } from './Popup.js';


export class PopupWithConfirmation extends Popup {

  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button');
  }

 
  open(cardId) {
    this._cardId = cardId;
    super.open();
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._cardId);
    });
  }

 
  renderLoading(isLoading, text = 'Eliminando...') {
    if (isLoading) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = 'Sí';
    }
  }
}