/**
 * Clase base para popups - Maneja funcionalidad común
 */
export class Popup {
  /**
   * @param {string} popupSelector - Selector CSS del popup
   */
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this); // Bind para mantener el contexto
  }

  /**
   * Abre el popup y agrega listener para tecla Esc
   */
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  /**
   * Cierra el popup y remueve listener de tecla Esc
   */
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  /**
   * Maneja el cierre con tecla Escape (método privado)
   * @param {KeyboardEvent} evt - Evento de teclado
   */
  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  /**
   * Agrega listeners para cerrar con clic fuera o en botón cerrar
   */
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup') || 
          evt.target.classList.contains('popup__button-close')) {
        this.close();
      }
    });
  }
}