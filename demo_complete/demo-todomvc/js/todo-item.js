(function() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        font-size: 24px;
        position: relative;
        border-bottom: 1px solid #ededed;
      }

      button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .toggle {
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none; /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
      }

      .toggle {
        opacity: 0;
      }

      .toggle + label {
        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center left;
      }

      .toggle:checked + label {
        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
      }

      label {
        word-break: break-all;
        padding: 15px 15px 15px 60px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
      }

      :host([completed]) label {
        color: #d9d9d9;
        text-decoration: line-through;
      }

      .destroy {
        display: none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
      }

      .destroy:hover {
        color: #af5b5e;
      }

      .destroy:after {
        content: "×";
      }

      :host(:hover) .destroy {
        display: block;
      }

      .edit {
        position: relative;
        width: calc(100% - 43px);
        padding: 12px 16px;
        margin: 0 0 0 43px;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        color: inherit;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .view {
        display: none;
      }

      .view.active {
        display: block;
      }

      .view + .edit {
        display: block;
      }

      .view.active + .edit {
        display: none;
      }
    </style>
    <div class="view active">
      <input class="toggle" type="checkbox">
      <label></label>
      <button class="destroy"></button>
    </div>
    <input class="edit"></input>
  `;

  class TodoItem extends HTMLElement {
    static get observedAttributes() {
      return ["label", "completed"];
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this._onCheckboxClick = this._onCheckboxClick.bind(this);
      this._onRemoveButtonClick = this._onRemoveButtonClick.bind(this);
      this._onLabelDoubleClick = this._onLabelDoubleClick.bind(this);
      this._onTextInputBlur = this._onTextInputBlur.bind(this);

      this._viewContainer = this.shadowRoot.querySelector(".view");
      this._label = this.shadowRoot.querySelector("label");
      this._checkbox = this.shadowRoot.querySelector(".toggle");
      this._removeButton = this.shadowRoot.querySelector(".destroy");
      this._textInput = this.shadowRoot.querySelector(".edit");
    }

    connectedCallback() {
      this._checkbox.addEventListener("click", this._onCheckboxClick);
      this._removeButton.addEventListener("click", this._onRemoveButtonClick);
      this._label.addEventListener("dblclick", this._onLabelDoubleClick);
      this._textInput.addEventListener("blur", this._onTextInputBlur);
    }

    disconnectedCallback() {
      this._checkbox.removeEventListener("click", this._onCheckboxClick);
      this._removeButton.removeEventListener(
        "click",
        this._onRemoveButtonClick
      );
      this._label.removeEventListener("dblclick", this._onLabelDoubleClick);
      this._textInput.removeEventListener("blur", this._onTextInputBlur);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "label":
          this._label.textContent = newValue || "";
          break;
        case "completed":
          this._checkbox.checked = this.completed;
          break;
      }
    }

    get completed() {
      return this.hasAttribute("completed");
    }

    set completed(isCompleted) {
      if (isCompleted) {
        this.setAttribute("completed", "");
      } else {
        this.removeAttribute("completed");
      }
    }

    get label() {
      return this.getAttribute("label");
    }

    set label(value) {
      if (value) {
        this.setAttribute("label", value);
      } else {
        this.removeAttribute("label");
      }
    }

    _onCheckboxClick(event) {
      this.completed = event.target.checked;
    }

    _onRemoveButtonClick(_) {
      this.remove();
    }

    _onLabelDoubleClick(_) {
      this._viewContainer.classList.remove("active");

      this._textInput.focus();
      this._textInput.value = this._label.textContent;
    }

    _onTextInputBlur(event) {
      this._label.textContent = event.target.value;

      this._viewContainer.classList.add("active");
    }
  }

  customElements.define("todo-item", TodoItem);
})();
