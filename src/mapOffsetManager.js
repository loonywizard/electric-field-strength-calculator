import Observer from './observer';

export default class MapOffsetManager extends Observer {
  constructor(canvasNode, mapScaleManager) {
    super();

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

  getMapOffset = () => ({ ...this.offset });
}
