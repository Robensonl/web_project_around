export class Card {
    constructor(data, templateSelector, handleCardClick) {
      // Inicializa propiedades de la tarjeta
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }
  
    // Método privado para obtener el template de la tarjeta
    _getTemplate() {
      return document
        .querySelector(this._templateSelector)
        .content.querySelector('.gallery__card')
        .cloneNode(true);
    }
  
    // Método privado para configurar los eventos de la tarjeta
    _setEventListeners() {
      // Evento para el botón de like
      this._likeButton.addEventListener('click', () => this._handleLikeButton());
  
      // Evento para el botón de eliminar
      this._deleteButton.addEventListener('click', () => this._handleDeleteCard());
  
      // Evento para abrir la imagen en popup
      this._cardImage.addEventListener('click', () => 
        this._handleCardClick(this._name, this._link));
    }
  
    // Método privado para manejar el botón de like
    _handleLikeButton() {
      this._likeButton.classList.toggle('gallery__card-button_active');
    }
  
    // Método privado para manejar la eliminación de la tarjeta
    _handleDeleteCard() {
      this._element.remove();
      this._element = null;
    }
  
    // Método público que genera y devuelve la tarjeta completa
    generateCard() {
      // Obtiene el template y los elementos necesarios
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.gallery__img');
      this._likeButton = this._element.querySelector('.gallery__card-button');
      this._deleteButton = this._element.querySelector('.gallery__delete-button');
      this._cardTitle = this._element.querySelector('.gallery__card-text');
  
      // Configura los datos de la tarjeta
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._cardTitle.textContent = this._name;
  
      // Configura los eventos
      this._setEventListeners();
  
      // Devuelve el elemento completo
      return this._element;
    }
  }