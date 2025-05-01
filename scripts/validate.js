// Función para reiniciar la validación al abrir los popups
const resetValidation = () => {
  // Seleccionar todos los formularios
  const popupForms = document.querySelectorAll(".popup__form");

  popupForms.forEach((popupForm) => {
    // Seleccionar todos los inputs de cada formulario
    const inputs = popupForm.querySelectorAll(".popup__input");

    inputs.forEach((input) => {
      // Escuchar evento de entrada de datos
      input.addEventListener("input", () => {
        const minLength = input.minLength;
        const popupError = popupForm.querySelector(`#${input.id}-error`);

        // Validación: ¿el valor es demasiado corto?
        if (input.value.length < minLength) {
          popupError.classList.add("popup__error_visible");
          popupError.textContent = "ERROR. DEBES CAPTURAR MÁS CARACTERES";
          input.classList.add("popup__input_type_error");
        } else {
          popupError.classList.remove("popup__error_visible");
          popupError.textContent = "";
          input.classList.remove("popup__input_type_error");
        }
      });
    });
  });
};

// Función de configuración (no se usa aún)
const validationConfig = () => {
  console.log("Este no lo usaremos aún");
};

// Exportar funciones
export { resetValidation, validationConfig };
