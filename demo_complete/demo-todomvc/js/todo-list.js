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
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this._onSlotChange = this._onSlotChange.bind(this);

      this._slot = this.shadowRoot.querySelector('slot');
    }

    connectedCallback() {
      this._slot.addEventListener('slotchange', this._onSlotChange);
    }

    disconnectedCallback() {
      this._slot.removeEventListener('slotchange', this._onSlotChange);
    }

    _onSlotChange(_) {
      // Remove all nodes that are unknown to todo-list
      this.childNodes.forEach(node => {
        if (!(node.nodeType === 1 && node.tagName === 'TODO-ITEM')) {
          node.remove();
        }
      });

      const todoItemElementCount = this._slot.assignedNodes().length;

      this.dispatchEvent(new CustomEvent('todolist-change', {
        detail: {
          todoItemElementCount
        }
      }));
    }

  }

  customElements.define('todo-list', TodoList);
})();
