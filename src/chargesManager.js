import Observer from './observer';
import ElectricCharge from './electricCharge';
import ChargesDnDManager from './chargesDnDManager';

/**
 * ChargesManager
 *
 * ChargesManager manages all charges, it can change their positions, add new charges,
 * it can give charges array
 *
 * @param {MapOffsetManager} args.mapOffsetManager
 * @param {MapScaleManager} args.mapScaleManager
 * @param {ScreenSizeManager} args.screenSizeManager
 *
 * @method updateChargesPositions
 * @method addCharge
 *
 * @function getCharges
 * @function getTestCharge
 *
 * @extends Observer
 * */
export default class ChargesManager extends Observer {
  constructor(args) {
    super();

    const { mapOffsetManager, mapScaleManager, screenSizeManager } = args;

    this.container = document.getElementById('charges-container');
    this.onChargesChange = this.notifySubscribers;
    this.mapOffsetManager = mapOffsetManager;
    this.getMapScale = mapScaleManager.getScale;
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

    this.chargesDnDManager = new ChargesDnDManager({
      charges: [...this.charges, this.testCharge],
      onChargeMove: this.onChargesChange,
      getMapOffset: mapOffsetManager.getMapOffset,
      getMapScale: this.getMapScale,
    });
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
