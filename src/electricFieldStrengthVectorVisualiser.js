import { drawArrow } from './canvasShapes';

/**
 * ElectricFieldStrengthVectorVisualiser
 *
 * ElectricFieldStrengthVectorVisualiser is responsible for drawing a vector of EFS
 *
 * @param {CanvasCtx} args.ctx
 * @param {Function} args.getMapOffset
 * @param {Function} args.getMapScale
 *
 * @method visualise
 * */
export default class ElectricFieldStrengthVectorVisualiser {
  constructor(args) {
    const { ctx, getMapOffset, getMapScale } = args;

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
