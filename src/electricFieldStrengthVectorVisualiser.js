import { drawArrow } from './canvasShapes';

/**
 * ElectricFieldStrengthVectorVisualiser is responsible for drawing a vector of EFS
 * */
export default class ElectricFieldStrengthVectorVisualiser {
  constructor(ctx, getMapOffset) {
    this.ctx = ctx;
    this.getMapOffset = getMapOffset;
  }
  visualise = (testChargePosition, efsAngle) => {
    const mapOffset = this.getMapOffset();

    drawArrow({
      ctx: this.ctx,
      position: {
        x: testChargePosition.x + mapOffset.x,
        y: testChargePosition.y + mapOffset.y,
      },
      angle: efsAngle,
    });
  }
}
