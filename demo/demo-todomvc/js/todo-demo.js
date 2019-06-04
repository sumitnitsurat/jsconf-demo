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

      // Bind the _onNewTodoKeyup and _onTodoListChange to current context
    }

    connectedCallback() {
      // Append the template to the host, variable reference declarations and add event listeners.
    }

    disconnectedCallback() {
      // Do the necessary cleanup, remove event listeners.
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

  // Define the new custom element as todo-demo
})();
