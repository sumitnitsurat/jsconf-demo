describe("todo-demo", () => {
  let todoApp;

  beforeEach(() => {
    const element = document.createElement('todo-demo');
    todoApp = document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(todoApp);
  });

  it("should NOT have shadowRoot", () => {
    expect(todoApp.shadowRoot).toBeFalsy();
  });

  it("should have hidden section by default", () => {
    const mainSection = todoApp.querySelector('.main');
    expect(mainSection.classList.contains('hidden')).toBe(true);
  });

  it("should add todo item", (done) => {
    const mainSection = todoApp.querySelector('.main');
    const newTodoInput = todoApp.querySelector('.new-todo');
    const todoList = todoApp.querySelector('todo-list');
    const todoCount = todoApp.querySelector('.todo-count strong');
    newTodoInput.value = 'Todo Item 1';

    newTodoInput.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 13 }));
    todoList.addEventListener('todolist-change', (event) => {
      expect(newTodoInput.value).toBeFalsy();
      expect(mainSection.classList.contains('hidden')).toBe(false);
      expect(event.detail.todoItemElementCount).toBe(1);
      expect(event.detail.todoItemElementCount).toBe(parseInt(todoCount.textContent));
      done();
    });
  });

});
