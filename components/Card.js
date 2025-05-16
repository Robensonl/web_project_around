/**
 * Clase para crear y gestionar tarjetas de lugares
 * Maneja la renderización, eventos de like/eliminar y clic en imagen
 */
export class Card {
  /**
   * @param {Object} data - Datos de la tarjeta {name, link}
   * @param {string} templateSelector - Selector CSS del template HTML
   * @param {Function} handleCardClick - Callback para clic en la imagen
   * @param {Function} handleDeleteClick - Callback para eliminar tarjeta
   * @param {Function} handleLikeClick - Callback para like
   */
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  /**
   * Obtiene el template de la tarjeta desde el DOM
   * @returns {HTMLElement} Elemento DOM del template clonado
   */
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__card')
      .cloneNode(true);
  }

  /**
   * Configura los event listeners para los elementos de la tarjeta
   */
  _setEventListeners() {
    // Like button
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this));
    
    // Delete button
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this));
    
    // Click en imagen
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._data));
  }

  /**
   * Alterna el estado de like de la tarjeta
   */
  toggleLike() {
    this._likeButton.classList.toggle('gallery__card-button_active');
  }

  /**
   * Elimina la tarjeta del DOM
   */
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  /**
   * Genera y devuelve la tarjeta completa con datos y eventos
   * @returns {HTMLElement} Tarjeta lista para insertar en el DOM
   */
  generateCard() {
    this._element = this._getTemplate();
    
    // Elementos internos
    this._cardImage = this._element.querySelector('.gallery__img');
    this._likeButton = this._element.querySelector('.gallery__card-button');
    this._deleteButton = this._element.querySelector('.gallery__delete-button');
    this._cardTitle = this._element.querySelector('.gallery__card-text');

    // Configurar contenido
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._cardTitle.textContent = this._data.name;

    // Configurar eventos
    this._setEventListeners();

    return this._element;
  }
}