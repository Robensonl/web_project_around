import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editFormValidator = new FormValidator(
  validationConfig, 
  document.forms.edit
);
editFormValidator.enableValidation();

// Validador para formulario de añadir tarjetas
const addFormValidator = new FormValidator(
  validationConfig, 
  document.forms.add
);
addFormValidator.enableValidation();

// Validador para formulario de avatar
const avatarFormValidator = new FormValidator(
  validationConfig, 
  document.forms.avatar
);
avatarFormValidator.enableValidation();

const apiConfig = {
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: "4603296b-3e9a-42cc-9f63-6031d7bc5a91",
    'Content-Type': 'application/json'
  }
};


const api = new Api(apiConfig);

// Inicialización de componentes
const userInfo = new UserInfo({
  nameSelector: '.profile__info-name',
  descriptionSelector: '.profile__info-details',
  avatarSelector: '.profile__photo'
});

// Popups
const popupWithImage = new PopupWithImage('.popup_type_image');
const popupEditProfile = new PopupWithForm('.popup_type_edit', handleProfileSubmit);
const popupAddCard = new PopupWithForm('.popup_type_add', handleAddCardSubmit);
const popupEditAvatar = new PopupWithForm('.popup_type_avatar', handleAvatarSubmit);

const popupConfirmDelete = new PopupWithConfirmation('.popup_type_confirm', handleDeleteCard);

// Handlers
function handleProfileSubmit(formData) {
  popupEditProfile.renderLoading(true);
  api.updateUserInfo(formData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch(console.error)
    .finally(() => popupEditProfile.renderLoading(false));
}


function handleAddCardSubmit(formData) {
  popupAddCard.renderLoading(true);
  api.addCard(formData)
    .then((cardData) => {
      const card =  createCard(cardData);
      cardSection.addItem(card)
      popupAddCard.close();
    })
    .catch(console.error)
    .finally(() => popupAddCard.renderLoading(false));
}

function handleAvatarSubmit(formData) {
  popupEditAvatar.renderLoading(true);
  api.updateAvatar(formData)
    .then((userData) => {
      userInfo.setUserAvatar(userData);
      popupEditAvatar.close();
    })
    .catch(console.error)
    .finally(() => popupEditAvatar.renderLoading(false));
}

function handleDeleteCard(cardId) {
  popupConfirmDelete.renderLoading(true);
  api.deleteCard(cardId)
    .then(() => {
      document.querySelector(`[data-card-id="${cardId}"]`).remove();
      popupConfirmDelete.close();
    })
    .catch(console.error)
    .finally(() => popupConfirmDelete.renderLoading(false));
}

function handleLikeCard(cardId,card) {
  const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
  const likeButton = cardElement?.querySelector('.gallery__card-button');
  
  if (!likeButton) return;
  
  // Deshabilitar botón durante la petición
  likeButton.disabled = true;
  const originalText = likeButton.textContent;
  likeButton.textContent = '...';

  const isLiked = likeButton.classList.contains('gallery__card-button_active');

  (isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId))
    .then((cardData) => {
     card._likes = cardData.isLiked
     card._updateLikesView()
    })
    .catch(console.error)
    .finally(() => {
      likeButton.disabled = false;
      likeButton.textContent = originalText;
    });
}

function createCard(cardData) {
  const card = new Card({
    data: cardData,
    templateSelector: '#card-template',
    handleCardClick: (data) => popupWithImage.open(data),
    handleDeleteClick: (cardId) => popupConfirmDelete.open(cardId),
    handleLikeClick: handleLikeCard
  });
  return card.generateCard();
}

const cardSection = new Section({
  items: [], 
  renderer: (item) => {
    const cardElement = createCard(item);
    return cardElement;
  }
}, '.gallery'); 



// Carga inicial
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    
    // Usamos Section para renderizar las tarjetas
    cardSection.renderItems(cards.map(card => ({
      ...card,
      userId: userData._id // Añadimos el userId a cada tarjeta
    })));
  })
  .catch(console.error);



// Editar perfil
document.querySelector('.profile__info-edit-button').addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  ({
    name: userData.name,
    about: userData.description
  });
  editFormValidator.resetValidation(); 
  popupEditProfile.open();
});



// Añadir tarjeta
document.querySelector('.profile__info-add-button').addEventListener('click', () => {
  addFormValidator.resetValidation();
  popupAddCard.open();
});

// Editar avatar
document.querySelector('.profile__photo-container').addEventListener('click', () => {
  avatarFormValidator.resetValidation(); 
  popupEditAvatar.open();
});

// Inicializar popups
[popupWithImage, popupEditProfile, popupAddCard, popupEditAvatar, popupConfirmDelete]
  .forEach(popup => popup.setEventListeners());