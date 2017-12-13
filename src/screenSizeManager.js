import Observer from './observer';

/**
 * ScreenSizeManager allows us to detect changes of the screen size
 *
 * screenSize is the size of web page in pixels
 *
 * @function getScreenSize
 *
 * @extends Observer
 * */
export default class ScreenSizeManager extends Observer {
  constructor() {
    super();

    window.addEventListener('resize', this.notifySubscribers);
  }

  getScreenSize = () => ({
    x: window.innerWidth,
    y: window.innerHeight,
  });
}
