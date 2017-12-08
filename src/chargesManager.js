import createElectricCharge from './electricCharge';
import ChargesDnDManager from './chargesDnDManager';

export default class ChargesManager {
  constructor(onChargesChange) {
    this.container = document.getElementById('container');
    this.onChargesChange = onChargesChange;
    
    this.charges = [
      createElectricCharge({
        position: { x: 100, y: 250 },
        parentDOMNode: this.container,
        charge: 10,
        onChargeInput: onChargesChange,
      }),
    ];

    this.testCharge = createElectricCharge({
      position: { x: 300, y: 350},
      parentDOMNode: this.container,
      charge: 10,
      isTest: true,
      onChargeInput: onChargesChange,
    });

    this.chargesDnDManager = new ChargesDnDManager(
      [...this.charges, this.testCharge],
      onChargesChange,
    );
  }
  
  addCharge = (chargeValue) => {
    const charge = createElectricCharge({
      position: { x: 400, y: 400 },
      parentDOMNode: this.container,
      charge: chargeValue,
      onChargeInput: this.onChargesChange,
    });

    this.charges.push(charge);
    this.chargesDnDManager.addItem(charge);
    this.onChargesChange();
  };
  
  getCharges = () => [...this.charges];
  
  getTestCharge = () => this.testCharge;
}