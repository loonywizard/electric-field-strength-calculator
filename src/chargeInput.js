import Dropdown from './dropdown';
import { SI_PREFIXES } from './consts';

/**
 * ChargeInput allows user to change charge value: it's number and si prefix
 *
 * ChargeInput looks like that:
 * <div class="charge-input>
 *   <input> - input for a number
 *   <div class=dropdown"></div> - dropdown for si prefixes
 * </div>
 * */
export default class ChargeInput {
  constructor(args) {
    const { onChargeInput } = args;

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

      onChargeInput({
        value: this.value,
        siPrefixName: this.siPrefixName,
      });
    };

    const dropdown = new Dropdown({
      selectedItemId: this.siPrefixName,
      items: SI_PREFIXES,
      onItemSelect: onDropdownSelect,
    });

    input.addEventListener('input', () => {
      this.value = input.value;

      onChargeInput({
        value: this.value,
        siPrefixName: this.siPrefixName,
      });
    });

    this.node.appendChild(input);
    this.node.appendChild(dropdown.render());
  }

  render = () => this.node;
}
