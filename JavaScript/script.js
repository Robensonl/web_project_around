document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.getElementById("editProfile");
  const popup = document.getElementById("editPopup");
  const closePopup = document.getElementById("closePopup");
  const saveButton = document.getElementById("saveProfile");
  const nameInput = document.getElementById("nameInput");
  const descriptionInput = document.getElementById("descriptionInput");
  const profileName = document.getElementById("profileName");
  const profileDescription = document.getElementById("profileDescription");

  editButton.addEventListener("click", () => {
    popup.classList.add("popup_opened");
  });

  closePopup.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
  });

  saveButton.addEventListener("click", () => {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    popup.classList.remove("popup_opened");
  });

  window.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.classList.remove("popup_opened");
    }
  });

  const likeButtons = document.querySelectorAll(".card__like");
  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("liked");
    });
  });
});
