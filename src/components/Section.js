export class Section {
 
  constructor({ items, renderer }, containerSelector) {
    this._items = items || []; // Array de datos iniciales
    this._renderer = renderer; // Función que crea y renderiza cada elemento
    this._container = document.querySelector(containerSelector); // Contenedor DOM
  }

  renderItems(cards) {
    cards.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  
  addItem(element, prepend = false) {
    if (prepend) {
      this._container.prepend(element); // Agrega al inicio
    } else {
      this._container.append(element); // Agrega al final
    }
  }

  /**
   * Limpia el contenedor eliminando todos los elementos
   */
  clear() {
    this._container.innerHTML = '';
  }

 
  updateItems(newItems) {
    this._items = newItems;
    this.clear();
    this.renderItems();
  }

 
  filterItems(filterFn) {
    this._items = this._items.filter(filterFn);
    this.clear();
    this.renderItems();
  }

  
  sortItems(compareFn) {
    this._items.sort(compareFn);
    this.clear();
    this.renderItems();
  }
}