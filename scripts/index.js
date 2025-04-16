// Constantes
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

// Selectores
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__info-add-button');
const closeButtons = document.querySelectorAll('.popup__button-close');
const closeSpans = document.querySelectorAll('.popup__close');
const editForm = document.forms['edit'];
const addForm = document.forms['add'];
const nameInput = editForm.querySelector('.popup__form-input-name');
const aboutInput = editForm.querySelector('.popup__form-input-about');
const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-details');
const gallery = document.querySelector('.gallery');
const cardTemplate = document.getElementById('card-template').content;
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

// Funciones para abrir/cerrar popups
function openPopup(popup) {
  popup.classList.add('openPopup');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('openPopup');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.openPopup');
    closePopup(openedPopup);
  }
}

// Manejo de clicks fuera del popup
function setupPopupCloseListeners() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup) {
        closePopup(popup);
      }
    });
  });
}

// Funciones para tarjetas
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.gallery__img');
  const cardTitle = cardElement.querySelector('.gallery__card-text');
  const likeButton = cardElement.querySelector('.gallery__card-button');
  const deleteButton = cardElement.querySelector('.gallery__delete-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  // Like button functionality
  console.log(likeButton);
  likeButton.addEventListener('click', () => {
    console.log("consulta like");
    likeButton.classList.toggle('gallery__card-button_active');

  });
  
  // Delete button functionality
  deleteButton.addEventListener('click', () => {
    cardElement.remove();

  });
  
  // Open image popup
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
    console.log("entrar")
    const cardElement = createCard(cardData);
    gallery.prepend(cardElement);
  });
}

// Funciones para formularios
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
  
  const newCard = {
    name: titleInput.value,
    link: linkInput.value
  };
  
  const cardElement = createCard(newCard);
  gallery.prepend(cardElement);
  
  addForm.reset();
  closePopup(addPopup);
}

// Event listeners
if (editButton) {
  editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileDescription.textContent;
    openPopup(editPopup);
  });
}

if (addButton) {
  addButton.addEventListener('click', () => {
    openPopup(addPopup);
  });
}

if (editForm) {
  editForm.addEventListener('submit', handleEditFormSubmit);
}

if (addForm) {
  addForm.addEventListener('submit', handleAddFormSubmit);
}

// Cerrar popups con botones y spans
closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

closeSpans.forEach(span => {
  const popup = span.closest('.popup');
  span.addEventListener('click', () => closePopup(popup));
});

// Inicialización
setupPopupCloseListeners();
renderInitialCards();