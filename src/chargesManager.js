import Observer from './observer';
import ElectricCharge from './electricCharge';
import ChargesDnDManager from './chargesDnDManager';

export default class ChargesManager extends Observer {
  constructor(mapOffsetManager) {
    super();

    this.container = document.getElementById('container');
    this.onChargesChange = this.notifySubscribers;
    this.mapOffsetManager = mapOffsetManager;

    this.charges = [
      new ElectricCharge({
        position: { x: 100, y: 250 },
        parentDOMNode: this.container,
        value: 10,
        onChargeInput: this.onChargesChange,
        siPrefixName: 'NANO',
        getMapOffset: this.mapOffsetManager.getMapOffset,
      }),
    ];

    this.testCharge = new ElectricCharge({
      position: { x: 300, y: 350 },
      parentDOMNode: this.container,
      value: 10,
      siPrefixName: 'NANO',
      isTest: true,
      onChargeInput: this.onChargesChange,
      getMapOffset: this.mapOffsetManager.getMapOffset,
    });

    this.chargesDnDManager = new ChargesDnDManager(
      [...this.charges, this.testCharge],
      this.onChargesChange,
      mapOffsetManager.getMapOffset,
    );
  }

  updateChargesPositions = () => {
    this.charges.forEach(charge => { charge.setNodePosition(); });
    this.testCharge.setNodePosition();
  };

  addCharge = ({ value, siPrefixName }) => {
    const charge = new ElectricCharge({
      position: { x: 400, y: 400 },
      parentDOMNode: this.container,
      value,
      siPrefixName,
      onChargeInput: this.onChargesChange,
      getMapOffset: this.mapOffsetManager.getMapOffset,
    });

    this.charges.push(charge);
    this.chargesDnDManager.addItem(charge);
    this.onChargesChange();
  };

  getCharges = () => [...this.charges];

  getTestCharge = () => this.testCharge;
}
