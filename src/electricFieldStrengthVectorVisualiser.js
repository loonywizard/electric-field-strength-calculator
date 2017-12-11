/**
 * ElectricFieldStrengthVectorVisualiser is responsible for drawing a vector of EFS
 * */
// TODO: Make it arrow, not just line
export default class ElectricFieldStrengthVectorVisualiser {
  constructor(ctx, getMapOffset) {
    this.ctx = ctx;
    this.getMapOffset = getMapOffset;
  }
  visualise = (testChargePosition, efsAngle) => {
    const mapOffset = this.getMapOffset();

    this.ctx.fillStyle = '#000';
    this.ctx.beginPath();
    this.ctx.moveTo(testChargePosition.x + mapOffset.x, testChargePosition.y + mapOffset.y);
    this.ctx.lineTo(
      testChargePosition.x + 100 * Math.cos(efsAngle) + mapOffset.x,
      testChargePosition.y + 100 * Math.sin(efsAngle) + mapOffset.y,
    );
    this.ctx.stroke();
  };
}
