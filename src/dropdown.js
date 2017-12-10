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
    this.node.classList.add('dropdown');


    this.button = document.createElement('button');
    this.button.innerHTML = items[selectedItemId].name;
    this.button.classList.add('button');

    this.itemsList = document.createElement('div');
    this.itemsList.classList.add('items-list', 'hidden');

    this.button.addEventListener('click', () => {
      this.itemsList.classList.toggle('hidden');
    });

    Object.keys(items).forEach((itemId) => {
      const itemNode = document.createElement('div');
      itemNode.innerHTML = items[itemId].name;
      itemNode.addEventListener('click', () => {
        this.button.innerHTML = items[itemId].name;
        onItemSelect(itemId);
      });
      this.itemsList.appendChild(itemNode);
    });

    this.node.appendChild(this.button);
    this.node.appendChild(this.itemsList);

    parentNode.appendChild(this.node);
  }
}