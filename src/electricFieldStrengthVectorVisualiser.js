import { drawArrow } from './canvasShapes';

/**
 * ElectricFieldStrengthVectorVisualiser is responsible for drawing a vector of EFS
 * */
export default class ElectricFieldStrengthVectorVisualiser {
  constructor(ctx, getMapOffset, getMapScale) {
    this.ctx = ctx;
    this.getMapOffset = getMapOffset;
    this.getMapScale = getMapScale;
  }
  visualise = (testChargePosition, efsAngle) => {
    const mapOffset = this.getMapOffset();
    const mapScale = this.getMapScale();

    drawArrow({
      ctx: this.ctx,
      position: {
        x: mapScale * (testChargePosition.x + mapOffset.x),
        y: mapScale * (testChargePosition.y + mapOffset.y),
      },
      angle: efsAngle,
    });
  }
}
