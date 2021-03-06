import ElectricFieldStrengthCalculator from './electricFieldStrengthCalculator';
import ElectricFieldStrengthVectorVisualiser from './electricFieldStrengthVectorVisualiser';
import formatNumber from './formatters';

/**
 * ElectricFieldStrengthManager
 *
 * ElectricFieldStrengthManager is responsible for calculating and visualising
 * a value of electric field strength
 *
 * @param {ChargesManager} args.chargesManager
 * @param {DielectricConstantManager} args.dielectricConstantManager
 * @param {Canvas} args.canvas
 * @param {MapOffsetManager} args.mapOffsetManager
 * @param {MapScaleManager} args.mapScaleManager
 *
 * @method calculateAndDisplayElectricFieldStrength
 * */
export default class ElectricFieldStrengthManager {
  constructor(args) {
    const {
      chargesManager,
      dielectricConstantManager,
      canvas,
      mapOffsetManager,
      mapScaleManager,
    } = args;

    const ctx = canvas.getCtx();

    this.canvas = canvas;
    this.chargesManager = chargesManager;
    this.mapOffsetManager = mapOffsetManager;
    this.mapScaleManager = mapScaleManager;

    this.efsDisplay = chargesManager.getTestCharge().getElectricFieldStrengthDisplayNode();
    this.chargesManager = chargesManager;

    this.electricFieldStrengthCalculator = new ElectricFieldStrengthCalculator({
      chargesManager,
      dielectricConstantManager,
    });
    this.electricFieldStrengthVectorVisualiser = new ElectricFieldStrengthVectorVisualiser({
      ctx,
      getMapOffset: mapOffsetManager.getMapOffset,
      getMapScale: mapScaleManager.getMapScale,
    });
  }

  calculateAndDisplayElectricFieldStrength = () => {
    const { efs, angle } = this.electricFieldStrengthCalculator.calculate();
    this.electricFieldStrengthVectorVisualiser.visualise(
      this.chargesManager.getTestCharge().getPosition(),
      angle,
    );

    const { formattedNumber, prefixName } = formatNumber(efs);

    this.efsDisplay.innerHTML = `E = ${formattedNumber} ${prefixName}v/m`;
  }
}
