/**
 * ElectricFieldStrengthVectorVisualiser is responsible for drawing a vector of EFS
 * */
// TODO: Make it arrow, not just line
export default class ElectricFieldStrengthVectorVisualiser {
  constructor(ctx) {
    this.ctx = ctx;
  }
  visualise = (testChargePosition, efsAngle) => {
    this.ctx.fillStyle = '#000';
    this.ctx.beginPath();
    this.ctx.moveTo(testChargePosition.x, testChargePosition.y);
    this.ctx.lineTo(
      testChargePosition.x + 100 * Math.cos(efsAngle),
      testChargePosition.y + 100 * Math.sin(efsAngle),
    );
    this.ctx.stroke();
  };
};