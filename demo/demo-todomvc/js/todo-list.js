(function() {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-direction: column;
      }
    </style>
    <slot></slot>
  `;

  class TodoList extends HTMLElement {

    constructor() {
      super();
      // append template to the shadow root

      this._onSlotChange = this._onSlotChange.bind(this);

      this._slot = this.shadowRoot.querySelector('slot');
    }

    connectedCallback() {
      // listen to slotchange
    }

    disconnectedCallback() {
      // clean up slotchange listener
    }

    _onSlotChange(_) {
      // Remove all nodes that are unknown to todo-list
      
      // Dispatch custom event 'todolist-change' with todoItemElementCount value
    }

  }

  // Define the new custom element as todo-list
})();
