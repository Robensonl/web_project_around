const popup = document.querySelector(".popup");
const editButton =document.querySelector (".profile__info-edit-button");
const closePopup = document.querySelector(".popup__close")
const closeButton = document.querySelector(".popup__button-close");
const formElement =document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__form-input-name");
const aboutInput = document.querySelector(".popup__form-input-about");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector (".profile__info-details");
const buttonSubmit = document.querySelector(".popup__button-save");
const openPopup =document.querySelector (".profile__info-add-button");


function handleOpenPopup() {
  if (popup) {
    popup.classList.add("openPopup");
  }
}

function handleClosePopup() {
  if (popup) {
    popup.classList.remove("openPopup");
  }
}

if (editButton) editButton.addEventListener("click", handleOpenPopup);
if (closePopup) closePopup.addEventListener("click", handleClosePopup)
if (closeButton) closeButton.addEventListener("click", handleClosePopup);

if (formElement) {
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (nameInput && aboutInput && profileName && profileDescription) {
      profileName.textContent = nameInput.value;
      profileDescription.textContent = aboutInput.value;
    }
    handleClosePopup();
  });
}