/**
 * Dropdown
 *
 * Dropdown create and manage html dropdown component,
 * whit which users can choose different options from dropdown list
 *
 * @param {String} selectedItemId
 * @param {Object} items - object of pairs: itemId: { ..., name, ... }
 * @param {Function} onItemSelect
 *
 * @function render - returns DOM Node of dropdown
 * */
export default class Dropdown {
  constructor(args) {
    const {
      selectedItemId,
      items,
      onItemSelect,
    } = args;

    this.node = document.createElement('div');
    this.node.classList.add('dropdown');


    const button = document.createElement('button');
    button.innerHTML = items[selectedItemId].name;
    button.classList.add('button');

    const itemsList = document.createElement('div');
    itemsList.classList.add('items-list', 'hidden');

    button.addEventListener('click', () => {
      itemsList.classList.toggle('hidden');
    });

    Object.keys(items).forEach((itemId) => {
      const itemNode = document.createElement('div');

      itemNode.innerHTML = items[itemId].name;

      itemNode.addEventListener('click', () => {
        itemsList.classList.add('hidden');
        button.innerHTML = items[itemId].name;
        onItemSelect(itemId);
      });

      itemsList.appendChild(itemNode);
    });

    this.node.appendChild(button);
    this.node.appendChild(itemsList);
  }

  render = () => this.node;
}
