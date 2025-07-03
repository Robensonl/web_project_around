export class Section {
 
  constructor({ items, renderer }, containerSelector) {
    this._items = items || []; 
    this._renderer = renderer; 
    this._container = document.querySelector(containerSelector); 
  }

  renderItems(cards) {
    cards.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  
  addItem(element, prepend = false) {
    if (prepend) {
      this._container.prepend(element); 
    } else {
      this._container.append(element); 
    }
  }

  
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