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

  });

  it("should remove unknown child", (done) => {    

  });

  it("should NOT remove 'todo-item' child", (done) => {    

  });
});
