import Observer from './observer';
import ElectricCharge from './electricCharge';
import ChargesDnDManager from './chargesDnDManager';

export default class ChargesManager extends Observer {
  constructor(mapOffsetManager, scaleManager, screenSizeManager) {
    super();

    this.container = document.getElementById('container');
    this.onChargesChange = this.notifySubscribers;
    this.mapOffsetManager = mapOffsetManager;
    this.getMapScale = scaleManager.getScale;
    this.getScreenSize = screenSizeManager.getScreenSize;

    this.charges = [
      new ElectricCharge({
        position: { x: 100, y: 250 },
        parentDOMNode: this.container,
        value: 10,
        onChargeInput: this.onChargesChange,
        siPrefixName: 'NANO',
        getMapOffset: this.mapOffsetManager.getMapOffset,
        getMapScale: this.getMapScale,
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
      getMapScale: this.getMapScale,
    });

    this.chargesDnDManager = new ChargesDnDManager(
      [...this.charges, this.testCharge],
      this.onChargesChange,
      mapOffsetManager.getMapOffset,
      this.getMapScale,
    );
  }

  updateChargesPositions = () => {
    this.charges.forEach((charge) => { charge.setNodePosition(); });
    this.testCharge.setNodePosition();
  };

  addCharge = ({ value, siPrefixName }) => {
    const screenSize = this.getScreenSize();
    const mapScale = this.getMapScale();
    const mapOffset = this.mapOffsetManager.getMapOffset();

    const position = {
      x: 1 / mapScale * screenSize.x / 2 - mapOffset.x,
      y: 1 / mapScale * screenSize.y / 2 - mapOffset.y,
    };

    const charge = new ElectricCharge({
      position,
      parentDOMNode: this.container,
      value,
      siPrefixName,
      onChargeInput: this.onChargesChange,
      getMapOffset: this.mapOffsetManager.getMapOffset,
      getMapScale: this.getMapScale,
    });

    this.charges.push(charge);
    this.chargesDnDManager.addItem(charge);
    this.onChargesChange();
  };

  getCharges = () => [...this.charges];

  getTestCharge = () => this.testCharge;
}
