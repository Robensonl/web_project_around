import { resetValidation } from './validate.js';

// Lista de tarjetas iniciales
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
const cardTemplate = document.getElementById('card-template').content;
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

// Funciones de popups
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) closePopup(openedPopup);
  }
}

function setupPopupCloseListeners() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closePopup(popup);
      }
    });
  });
}

// Funciones de tarjetas
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.gallery__img');
  const cardTitle = cardElement.querySelector('.gallery__card-text');
  const likeButton = cardElement.querySelector('.gallery__card-button');
  const deleteButton = cardElement.querySelector('.gallery__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('gallery__card-button_active');
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openPopup(imagePopup);
  });

  return cardElement;
}

function renderInitialCards() {
  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData);
    gallery.prepend(cardElement);
  });
}

// Funciones de formularios
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  closePopup(editPopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const titleInput = addForm.querySelector('[name="title"]');
  const linkInput = addForm.querySelector('[name="link"]');
  const newCard = { name: titleInput.value, link: linkInput.value };
  gallery.prepend(createCard(newCard));
  addForm.reset();
  closePopup(addPopup);
}

// Event listeners
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
  openPopup(editPopup);
  resetValidation(); // Activar validación personalizada
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
  resetValidation(); // Activar validación personalizada
});

editForm.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);

closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Inicializar
setupPopupCloseListeners();
renderInitialCards();
