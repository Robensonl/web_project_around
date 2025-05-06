import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup, setupPopupCloseListeners } from './utils.js';

// Array de tarjetas iniciales
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

// Selectores
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__info-add-button');
const closeButtons = document.querySelectorAll('.popup__button-close');
const editForm = document.forms['edit'];
const addForm = document.forms['add'];
const nameInput = editForm.querySelector('[name="name"]');
const aboutInput = editForm.querySelector('[name="about"]');
const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-details');
const gallery = document.querySelector('.gallery');
const cardTemplate = '#card-template';
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

// Configuración de validación
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Instancias de validación de formularios
const editFormValidator = new FormValidator(validationConfig, editForm);
const addFormValidator = new FormValidator(validationConfig, addForm);

// Función para manejar el click en la imagen de la tarjeta
function handleCardClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openPopup(imagePopup);
}

// Función para crear una nueva tarjeta
function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, handleCardClick);
  return card.generateCard();
}

// Renderizar tarjetas iniciales
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    gallery.prepend(cardElement);
  });
}

// Manejar envío del formulario de edición
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  closePopup(editPopup);
}

// Manejar envío del formulario de añadir
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const titleInput = addForm.querySelector('[name="title"]');
  const linkInput = addForm.querySelector('[name="link"]');
  const newCard = { name: titleInput.value, link: linkInput.value };
  gallery.prepend(createCard(newCard));
  addForm.reset();
  addFormValidator.resetValidation();
  closePopup(addPopup);
}

// Event listeners
editButton.addEventListener('click', () => {
  //nameInput.value = profileName.textContent;
  //aboutInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  openPopup(addPopup);
});

editForm.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Inicialización
setupPopupCloseListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();
renderInitialCards();