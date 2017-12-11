import Observer from './observer';
import { SCALING_DIRECTIONS } from './consts';

export default class MapOffsetManager extends Observer {
  constructor(canvasNode, mapScaleManager, screenSizeManager) {
    super();

    this.mapScaleManager = mapScaleManager;
    this.screenSizeManager = screenSizeManager;

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

        const mouseDx = mapScale ** -1 * (currentMousePosition.x - lastMousePosition.x);
        const mouseDy = mapScale ** -1 * (currentMousePosition.y - lastMousePosition.y);

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

  onMapScale = (direction) => {
    const scaleMultiplier = this.mapScaleManager.getScaleMultiplier();
    const scale = this.mapScaleManager.getScale();
    const screenSize = this.screenSizeManager.getScreenSize();

    if (direction === SCALING_DIRECTIONS.UP) {
      const dx = ((scaleMultiplier - 1) / scaleMultiplier) * screenSize.x / 2;
      const dy = ((scaleMultiplier - 1) / scaleMultiplier) * screenSize.y / 2;

      this.offset.x -= scaleMultiplier * dx / (scale);
      this.offset.y -= scaleMultiplier * dy / (scale);
    } else if (direction === SCALING_DIRECTIONS.DOWN) {
      const dx = screenSize.x * (scaleMultiplier - 1) / (2 * scaleMultiplier);
      const dy = screenSize.y * (scaleMultiplier - 1) / (2 * scaleMultiplier);

      this.offset.x += dx / (scale);
      this.offset.y += dy / (scale);
    }

    this.notifySubscribers();
  };

  getMapOffset = () => ({ ...this.offset });
}
