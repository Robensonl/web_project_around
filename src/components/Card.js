export class Card {
  constructor({
    data,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId,
    templateSelector
  }) {
    // Datos de la tarjeta
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._id = data._id;
    this._ownerId = data.owner._id;
    
    // Configuración del usuario y template
    this._userId = userId;
    this._templateSelector = templateSelector;
    
    // Manejadores de eventos
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    
    // Elementos DOM (se inicializan en generateCard)
    this._element = null;
    this._cardImage = null;
    this._likeButton = null;
    this._deleteButton = null;
    this._likeCount = null;
    this._cardTitle = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._initializeElements();
    this._setupContent();
    this._setupVisibility();
    this.setLikes(this._likes);
    this._setEventListeners();

    return this._element;
  }

 
  setLikes(likes) {
    this._likes = likes;
    this._updateLikesView();
  }

  
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  
  isLiked() {
    return this._likes.some(user => user._id === this._userId);
  }

  
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__card')
      .cloneNode(true);
  }

  
  _initializeElements() {
    this._cardImage = this._element.querySelector('.gallery__img');
    this._likeButton = this._element.querySelector('.gallery__card-button');
    this._deleteButton = this._element.querySelector('.gallery__delete-button');
    this._likeCount = this._element.querySelector('.gallery__like-count');
    this._cardTitle = this._element.querySelector('.gallery__card-text');
  }

 
  _setupContent() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._element.dataset.cardId = this._id;
  }

  
  _setupVisibility() {
    // Mostrar botón de eliminar solo si es el dueño
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
  }

  
  _updateLikesView() {
    this._likeCount.textContent = this._likes.length;
    
    if (this.isLiked()) {
      this._likeButton.classList.add('gallery__card-button_active');
    } else {
      this._likeButton.classList.remove('gallery__card-button_active');
    }
  }

  
  _setEventListeners() {
    // Like button
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });

    // Delete button (si existe)
    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick(this._id);
      });
    }

    // Click en la imagen
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }
}