// Función para abrir popups
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
  }
  
  // Función para cerrar popups
  export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
  }
  
  // Función para cerrar popups con la tecla Escape
  function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) closePopup(openedPopup);
    }
  }
  
  // Configura los event listeners para cerrar popups haciendo click fuera
  export function setupPopupCloseListeners() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
          closePopup(popup);
        }
      });
    });
  }