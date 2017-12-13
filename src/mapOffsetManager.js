import Observer from './observer';
import { SCALING_DIRECTIONS } from './consts';

/**
 * MapOffsetManager
 *
 * MapOffsetManager manages map offset in application
 * With mouse dragging user can scroll map
 *
 * @args {CanvasNode} args.canvasNode
 * @args {MapScaleManager} args.mapScaleManager
 * @args {ScreenSizeManager} args.screenSizeManager
 *
 * @method onMapScale
 * @function getMapOffset
 * */
export default class MapOffsetManager extends Observer {
  constructor(args) {
    super();

    const { canvasNode, mapScaleManager, screenSizeManager } = args;

    this.mapScaleManager = mapScaleManager;
    this.screenSizeManager = screenSizeManager;

    /*
    * Offset by axis X is distance in meters between current left top angle of window
    * and initial left top angle of window
    *
    * Because we store offset in meters, we should divide diff in mouse positions by map scale,
    * See MapScaleManager for understanding what map scale is, in a few words:
    * 1 / scale meters = 1 pixel
    * */
    this.offset = {
      x: 0,
      y: 0,
    };

    let isMouseDown = false;
    let isDragging = false;
    let hasDraggingStarted = false;
    let lastMousePosition = null;

    canvasNode.addEventListener('mousedown', (event) => {
      isMouseDown = true;
      lastMousePosition = {
        x: event.pageX,
        y: event.pageY,
      };
    });

    document.addEventListener('mousemove', (event) => {
      isDragging = isMouseDown;
      if (isDragging) {
        if (!hasDraggingStarted) {
          canvasNode.classList.add('dragging');
          hasDraggingStarted = true;
        }

        const mapScale = mapScaleManager.getScale();

        const currentMousePosition = {
          x: event.pageX,
          y: event.pageY,
        };

        const mouseDx = (currentMousePosition.x - lastMousePosition.x) / mapScale;
        const mouseDy = (currentMousePosition.y - lastMousePosition.y) / mapScale;

        this.offset.x += mouseDx;
        this.offset.y += mouseDy;

        this.notifySubscribers();

        lastMousePosition = currentMousePosition;
      }
    });

    document.addEventListener('mouseup', () => {
      if (hasDraggingStarted) {
        canvasNode.classList.remove('dragging');
      }
      isMouseDown = false;
      isDragging = false;
      hasDraggingStarted = false;
      lastMousePosition = null;
    });
  }

  /*
  * When we scale the map, it's important to scale relative to center of current screen,
  * so when we scale up or scale down the map, we should recalculate map offset
  * */
  onMapScale = (direction) => {
    const scaleMultiplier = this.mapScaleManager.getScaleMultiplier();
    const scale = this.mapScaleManager.getScale();
    const screenSize = this.screenSizeManager.getScreenSize();

    if (direction === SCALING_DIRECTIONS.UP) {
      const dx = screenSize.x * (scaleMultiplier - 1) / 2;
      const dy = screenSize.y * (scaleMultiplier - 1) / 2;

      this.offset.x -= dx / scale;
      this.offset.y -= dy / scale;
    } else if (direction === SCALING_DIRECTIONS.DOWN) {
      const dx = screenSize.x * (scaleMultiplier - 1) / (2 * scaleMultiplier);
      const dy = screenSize.y * (scaleMultiplier - 1) / (2 * scaleMultiplier);

      this.offset.x += dx / scale;
      this.offset.y += dy / scale;
    }

    this.notifySubscribers();
  };

  getMapOffset = () => ({ ...this.offset });
}
