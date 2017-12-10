import ChargeInput from './chargeInput';
import Observer from './observer';

export default class ChargesCreator extends Observer {
  constructor() {
    super();

    const buttonNode = document.getElementById('add-charge-button');
    const container = document.getElementById('new-charge-container');

    this.value = 10;
    this.siPrefixName = 'NANO';

    const onChargeInput = ({ value, siPrefixName }) => {
      this.value = value;
      this.siPrefixName = siPrefixName;
    };

    const inputNode = new ChargeInput({
      value: this.value,
      siPrefixName: this.siPrefixName,
      onChargeInput,
    });

    buttonNode.addEventListener('click', () => {
      this.notifySubscribers({
        value: this.value,
        siPrefixName: this.siPrefixName,
      });
    });

    container.appendChild(inputNode.render());
  }
}
