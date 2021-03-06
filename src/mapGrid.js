/**
 * MapGrid
 *
 * MapGrid instance can draw a grid behind the charges, so user can see distances between charges
 *
 * @param {Canvas} args.canvas
 * @param {MapOffsetManager} args.mapOffsetManager
 * @param {ScreenSizeManager} args.screenSizeManager
 * @param {MapScaleManager} args.mapScaleManager
 *
 * @method visualise
 * */
export default class MapGrid {
  constructor(args) {
    const {
      canvas, mapOffsetManager, screenSizeManager, mapScaleManager,
    } = args;

    this.canvas = canvas;
    this.mapOffsetManager = mapOffsetManager;
    this.screenSizeManager = screenSizeManager;
    this.mapScaleManager = mapScaleManager;

    this.gridStep = 50;
  }

  visualise = () => {
    const mapOffset = this.mapOffsetManager.getMapOffset();
    const ctx = this.canvas.getCtx();
    const screenSize = this.screenSizeManager.getScreenSize();
    const scale = this.mapScaleManager.getMapScale();

    ctx.save();

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#b7b7b7';

    for (let i = 0; i < screenSize.y / this.gridStep; i += 1) {
      ctx.beginPath();
      ctx.moveTo(0, i * this.gridStep + scale * mapOffset.y % this.gridStep);
      ctx.lineTo(screenSize.x, i * this.gridStep + scale * mapOffset.y % this.gridStep);
      ctx.stroke();
    }

    for (let i = 0; i < screenSize.x / this.gridStep; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * this.gridStep + scale * mapOffset.x % this.gridStep, 0);
      ctx.lineTo(i * this.gridStep + scale * mapOffset.x % this.gridStep, screenSize.y);
      ctx.stroke();
    }

    ctx.restore();
  }
}
