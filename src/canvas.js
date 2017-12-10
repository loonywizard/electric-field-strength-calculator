/**
 * Canvas object can clear it's rect and share it's ctx object
 * */
export default class Canvas {
  constructor(screenSizeManager) {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.screenSizeManager = screenSizeManager;

    this.onScreenSizeChange(); // init screen size
    screenSizeManager.subscribe(this.onScreenSizeChange);
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
}
