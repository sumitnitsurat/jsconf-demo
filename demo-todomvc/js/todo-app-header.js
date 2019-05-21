(function() {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-direction: column;
      }
      
      :host h1 {
        position: absolute;
        top: -155px;
        width: 100%;
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
        -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility;
      }

      :host input::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
      }

      :host input::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
      }

      :host input::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
      }

      :host .flex-container {
        display: flex;
      }

      :host .toggle-container {
        width: 60px;
      }

      :host .toggle-container + #new-todo {
        flex: 1;
      }

      :host #new-todo {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        color: inherit;
        outline: none;
        padding: 16px 16px 16px 0;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      :host #toggle-all {
        width: 1px;
        height: 1px;
        border: none; /* Mobile Safari */
        opacity: 0;
        position: absolute;
        right: 100%;
        bottom: 100%;
      }

      :host #toggle-all + label {
        width: 60px;
        height: 34px;
        font-size: 0;
        position: absolute;
        top: 14px;
        left: -13px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
      }

      :host #toggle-all + label:before {
        content: "❯";
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
      }

      :host #toggle-all:checked + label:before {
        color: #737373;
      }
    </style>
    <h1></h1>
    <div class="flex-container">
      <div class="toggle-container">
        <input id="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
      </div>
      <input id="new-todo"/>
    </div>
  `;

  class TodoAppHeader extends HTMLElement {

    static get observedAttributes() {
      return ['label', 'placeholder'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this._header = this.shadowRoot.querySelector('h1');
      this._newTodoInput = this.shadowRoot.querySelector('#new-todo');
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'label':
          this._setLabel(newValue);
          break;
        case 'placeholder':
          this._setPlaceholder(newValue);
          break;
        default:
          break;
      }
    }

    _setPlaceholder(val) {
      this._newTodoInput.placeholder = val || '';
    }

    _setLabel(val) {
      this._header.textContent = val || '';
    }
  }

  customElements.define('todo-app-header', TodoAppHeader);
})();
