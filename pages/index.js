// pages/index.js
/**
 * Punto de entrada principal de la aplicación
 * Configura todas las instancias y event listeners
 */

// Importaciones de módulos
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// Datos iniciales para tarjetas
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

// Configuración de validación de formularios
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Inicialización de módulos principales

// Gestión de información de usuario
const userInfo = new UserInfo({
  nameSelector: '.profile__info-name',
  descriptionSelector: '.profile__info-details'
});

// Popup para visualización de imágenes ampliadas
const popupWithImage = new PopupWithImage('.popup_type_image');

// Sección para renderizar tarjetas
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item,
      '#card-template',
      (data) => popupWithImage.open(data),
      (card) => card.removeCard(),
      (card) => card.toggleLike()
    );
    cardSection.addItem(card.generateCard());
  }
}, '.gallery');

// Popup de edición de perfil
const editPopup = new PopupWithForm('.popup_type_edit', (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    description: formData.about
  });
  editPopup.close();
});

// Popup para añadir nuevas tarjetas
const addPopup = new PopupWithForm('.popup_type_add', (formData) => {
  const newCard = {
    name: formData.title,
    link: formData.link
  };
  const card = new Card(
    newCard,
    '#card-template',
    (data) => popupWithImage.open(data),
    (card) => card.removeCard(),
    (card) => card.toggleLike()
  );
  cardSection.addItem(card.generateCard());
  addPopup.close();
});

// Event Listeners principales

// Botón de editar perfil
document.querySelector('.profile__info-edit-button').addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  editPopup.setInputValues(userData);
  editPopup.open();
});

// Botón de añadir nueva tarjeta
document.querySelector('.profile__info-add-button').addEventListener('click', () => {
  addPopup.open();
});

// Inicialización de validadores de formularios
const editFormValidator = new FormValidator(validationConfig, document.forms['edit']);
const addFormValidator = new FormValidator(validationConfig, document.forms['add']);

// Habilitar validación
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Renderizar tarjetas iniciales
cardSection.renderItems();

// Inicializar todos los popups
[popupWithImage, editPopup, addPopup].forEach(popup => popup.setEventListeners());