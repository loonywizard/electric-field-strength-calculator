import Observer from './observer';
import ElectricCharge from './electricCharge';
import ChargesDnDManager from './chargesDnDManager';

export default class ChargesManager extends Observer {
  constructor() {
    super();

    this.container = document.getElementById('container');
    this.onChargesChange = this.notifySubscribers;

    this.charges = [
      new ElectricCharge({
        position: { x: 100, y: 250 },
        parentDOMNode: this.container,
        value: 10,
        onChargeInput: this.onChargesChange,
        siPrefixName: 'NANO',
      }),
    ];

    this.testCharge = new ElectricCharge({
      position: { x: 300, y: 350 },
      parentDOMNode: this.container,
      value: 10,
      siPrefixName: 'NANO',
      isTest: true,
      onChargeInput: this.onChargesChange,
    });

    this.chargesDnDManager = new ChargesDnDManager(
      [...this.charges, this.testCharge],
      this.onChargesChange,
    );
  }

  addCharge = ({ value, siPrefixName }) => {
    const charge = new ElectricCharge({
      position: { x: 400, y: 400 },
      parentDOMNode: this.container,
      value,
      siPrefixName,
      onChargeInput: this.onChargesChange,
    });

    this.charges.push(charge);
    this.chargesDnDManager.addItem(charge);
    this.onChargesChange();
  };

  getCharges = () => [...this.charges];

  getTestCharge = () => this.testCharge;
}
