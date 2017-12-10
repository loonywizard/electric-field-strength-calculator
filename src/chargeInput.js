import Dropdown from './dropdown';
import { SI_PREFIXES } from './consts';

export default class ChargeInput {
  constructor(args) {
    const {
      parentNode, value, siPrefixName, onChargeInput,
    } = args;

    this.value = value;
    this.siPrefixName = siPrefixName;

    this.node = document.createElement('div');

    this.node.classList.add('charge-input');

    this.input = document.createElement('input');
    this.input.setAttribute('type', 'number');
    this.input.setAttribute('value', value);
    this.input.classList.add('input');

    const onDropdownSelect = (siPrefixName) => {
      this.siPrefixName = siPrefixName;

      onChargeInput({
        value: this.value,
        siPrefixName: this.siPrefixName,
      });
    };

    this.node.appendChild(this.input);

    const dropdown = new Dropdown({
      parentNode: this.node,
      selectedItemId: siPrefixName,
      items: SI_PREFIXES,
      onItemSelect: onDropdownSelect,
    });

    this.input.addEventListener('input', () => {
      this.value = this.input.value;

      onChargeInput({
        value: this.value,
        siPrefixName: this.siPrefixName,
      });
    });

    parentNode.appendChild(this.node);
  }
}