import ElectricFieldStrengthCalculator from './electricFieldStrengthCalculator';
import ElectricFieldStrengthVectorVisualiser from './electricFieldStrengthVectorVisualiser';

export default class ElectricFieldStrengthManager {
  constructor(chargesManager, dielectricConstantManager, canvas) {
    const ctx = canvas.getCtx();

    this.canvas = canvas;
    this.chargesManager = chargesManager;

    this.efsDisplay = chargesManager.getTestCharge().getElectricFieldStrengthDisplayNode();
    this.chargesManager = chargesManager;

    this.electricFieldStrengthCalculator = new ElectricFieldStrengthCalculator(
      chargesManager, dielectricConstantManager,
    );
    this.electricFieldStrengthVectorVisualiser = new ElectricFieldStrengthVectorVisualiser(ctx);
  }

  calculateAndDisplayElectricFieldStrength = () => {
    const { efs, angle } = this.electricFieldStrengthCalculator.calculate();
    this.canvas.clear();
    this.electricFieldStrengthVectorVisualiser.visualise(
      this.chargesManager.getTestCharge().getPosition(), angle,
    );
    this.efsDisplay.innerHTML = `E = ${efs.toExponential(5)} v/m`;
  }
}