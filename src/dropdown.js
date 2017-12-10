export default class Dropdown {
  constructor(args) {
    const {
      parentNode,
      selectedItemId,
      items,
      onItemSelect,
    } = args;

    this.items = items;
    this.selectedItemId = selectedItemId;

    this.node = document.createElement('div');

    this.button = document.createElement('button');
    this.button.innerHTML = items[selectedItemId].name;

    this.dropdown = document.createElement('dropdown');

    Object.keys(items).forEach((itemId) => {
      const itemNode = document.createElement('div');
      itemNode.innerHTML = items[itemId].name;
      itemNode.addEventListener('click', () => {
        this.button.innerHTML = items[itemId].name;
        onItemSelect(itemId);
      });
      this.dropdown.appendChild(itemNode);
    });

    this.node.appendChild(this.button);
    this.node.appendChild(this.dropdown);

    parentNode.appendChild(this.node);
  }
}