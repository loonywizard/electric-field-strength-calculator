import ChargeInput from './chargeInput';
import Observer from './observer';

/**
 * ChargesCreator
 *
 * ChargesCreator is responsible for creating new charges
 * ChargesCreator handles input in new-charge-container,
 * and when user clicks on 'Add charge' Button, it will notify ChargesManager
 * and ElectricFieldStrengthCalculator,
 * so ChargesManager can add new charge to scene, add event handlers,
 * ElectricFieldStrengthCalculator will calculate new Electric Field Strength
 *
 * @extends Observer
 * */
export default class ChargesCreator extends Observer {
  constructor() {
    super();

    const buttonNode = document.getElementById('add-charge-button');
    const container = document.getElementById('new-charge-container');

    /*
    * These values a init values for new charge, user can change them with ChargeInput
    * */
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
