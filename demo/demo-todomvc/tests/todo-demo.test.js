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

  });

  it("should have hidden section by default", () => {

  });

  it("should add todo item", (done) => {

  });

});
