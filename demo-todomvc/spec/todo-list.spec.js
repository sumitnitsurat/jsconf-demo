describe("todo-list", () => {
  let todoList;

  beforeEach(() => {
    const element = document.createElement('todo-list');
    todoList = document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(todoList);
  });

  it("should have shadowRoot", () => {
    expect(todoList.shadowRoot).toBeTruthy();
  });

  it("should remove unknown child", (done) => {    
    todoList.addEventListener('todolist-change', (event) => {
      expect(event.detail.todoItemElementCount).toBe(todoList.children.length);
      done();
    });

    todoList.appendChild(document.createElement('div'));
  });

  it("should NOT remove 'todo-item' child", (done) => {    
    todoList.addEventListener('todolist-change', (event) => {
      expect(event.detail.todoItemElementCount).toBe(todoList.children.length);
      done();
    });

    todoList.appendChild(document.createElement('todo-item'));
  });
});
