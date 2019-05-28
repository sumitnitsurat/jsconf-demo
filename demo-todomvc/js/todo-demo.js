(function() {
  const template = document.createElement('template');
  template.innerHTML = `
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus>
    </header>

    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main hidden">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <todo-list></todo-list>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
      <!-- This should be '0 items left' by default -->
      <span class="todo-count"><strong>0</strong> item left</span>
    </footer>
  `;

  class TodoDemo extends HTMLElement {

    constructor() {
      super();

      this._onNewTodoKeyup = this._onNewTodoKeyup.bind(this);
      this._onTodoListChange = this._onTodoListChange.bind(this);
    }

    connectedCallback() {
      if (!this.childElementCount) {
        this.appendChild(template.content.cloneNode(true));
      }

      this._todoList = this.querySelector('todo-list');
      this._newTodoInput = this.querySelector('.new-todo');
      this._mainSection = this.querySelector('.main');
      this._todoCount = this.querySelector('.todo-count strong');

      this._newTodoInput.addEventListener('keyup', this._onNewTodoKeyup);
      this._todoList.addEventListener('todolist-change', this._onTodoListChange);
    }

    disconnectedCallback() {
      this._newTodoInput.removeEventListener('keyup', this._onNewTodoKeyup);
      this._todoList.removeEventListener('todolist-change', this._onTodoListChange);
    }

    _onNewTodoKeyup(event) {
      const target = event.target;

      if (event.keyCode === 13 && target.value) {
        this._addTodoItem(target.value);
        target.value = '';
      }
    }

    _onTodoListChange(event) {
      const count = event.detail.todoItemElementCount;
      if (count) {
        this._mainSection.classList.remove('hidden');
      } else {
        this._mainSection.classList.add('hidden');
      }

      this._todoCount.textContent = count;
    }

    _addTodoItem(label) {
      const item = document.createElement('todo-item');
      item.label = label;

      this._todoList.appendChild(item);
    }

  }

  customElements.define('todo-demo', TodoDemo);
})();
