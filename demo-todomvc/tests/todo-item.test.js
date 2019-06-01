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
    expect(todoItem.shadowRoot).toBeTruthy();
  });

  it("should reflect property 'completed' to attribute", () => {
    // By default completed should be false
    expect(todoItem.hasAttribute('completed')).toBe(false);

    // changing completed via property should reflect to attribute
    todoItem.completed = true;
    expect(todoItem.hasAttribute('completed')).toBe(true);
  });

  it("should reflect property 'label' to attribute", () => {
    const shadowRootLabel = todoItem.shadowRoot.querySelector('label');
    const newLabelValue = "JS Conf 2019";

    // By default label should be empty
    expect(shadowRootLabel.textContent).toBe("");

    // changing label via property should reflect to the label inside of shadowRoot
    todoItem.label = newLabelValue;
    expect(shadowRootLabel.textContent).toBe(newLabelValue);
  });
});
