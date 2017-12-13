import Dropdown from './dropdown';
import { SI_PREFIXES } from './consts';

/**
 * ChargeInput
 *
 * ChargeInput allows user to change charge value: it's number and si prefix
 *
 * @param {Function} args.onChargeInput
 *
 * @function render - returns DOM Node of charge input
 * */
export default class ChargeInput {
  constructor(args) {
    const { onChargeInput } = args;

    this.onChargeInput = onChargeInput;

    this.value = args.value;
    this.siPrefixName = args.siPrefixName;

    this.node = document.createElement('div');

    this.node.classList.add('charge-input');

    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('value', this.value);
    input.classList.add('input');

    const onDropdownSelect = (siPrefixName) => {
      this.siPrefixName = siPrefixName;

      this.handleChargeInput();
    };

    const dropdown = new Dropdown({
      selectedItemId: this.siPrefixName,
      items: SI_PREFIXES,
      onItemSelect: onDropdownSelect,
    });

    input.addEventListener('input', () => {
      this.value = input.value;

      this.handleChargeInput();
    });

    this.node.appendChild(input);
    this.node.appendChild(dropdown.render());
  }

  handleChargeInput = () => {
    this.onChargeInput({
      value: this.value,
      siPrefixName: this.siPrefixName,
    });
  };

  render = () => this.node;
}
