describe("todo-item", () => {
  let todoItem;

  beforeEach(() => {
    const element = document.createElement('todo-item');
    todoItem = document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(todoItem);
  });

  it("should have shadowRoot", () => {
  
  });

  it("should reflect property 'completed' to attribute", () => {

  });

  it("should reflect property 'label' to attribute", () => {

  });
});
