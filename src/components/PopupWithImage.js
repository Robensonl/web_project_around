import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
 
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  
  open(data) {
    this._image.src = data.link;
    this._image.alt = `Imagen de ${data.name}`;
    this._caption.textContent = data.name;
    super.open();
  }
}