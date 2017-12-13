/**
 * Canvas
 *
 * @param {ScreenSizeManager} args.screenSizeManager
 *
 * @method onScreenSizeChange - changes width and height properties of DON Node
 * @method clear              - clears canvas
 *
 * @function getCtx           - returns ctx object
 * @function getDOMNode       - returns DOM Node
 * */
export default class Canvas {
  constructor(args) {
    const { screenSizeManager } = args;

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.screenSizeManager = screenSizeManager;

    this.onScreenSizeChange(); // init screen size
  }

  onScreenSizeChange = () => {
    this.screenSize = this.screenSizeManager.getScreenSize();
    this.canvas.width = this.screenSize.x;
    this.canvas.height = this.screenSize.y;
  };

  clear = () => {
    const { x, y } = this.screenSize;
    this.ctx.clearRect(0, 0, x, y);
  };

  getCtx = () => this.ctx;

  getDOMNode = () => this.canvas;
}
