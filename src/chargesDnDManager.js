/**
 * ChargesDnDManager
 *
 * ChargesDnDManager allows us to drag and drop charges, so we can change their positions
 *
 * @param {Array} args.charges
 * @param {Function} args.onChargeMove,
 * @param {Function} args.getMapOffset
 * @param {Function} getMapScale
 *
 * @function addItem - ChargesManager calls this function,
 *   when it wants to make new charge 'draggable'
 * */
export default class ChargesDnDManager {
  constructor(args) {
    const {
      charges, onChargeMove, getMapOffset, getMapScale,
    } = args;

    this.items = charges;
    this.onItemMove = onChargeMove;
    this.getMapOffset = getMapOffset;
    this.getMapScale = getMapScale;

    this.isMouseDown = false;
    this.isDragging = false;
    this.draggingItem = null;
    this.mouseOffsetX = null;
    this.mouseOffsetY = null;
    this.hasDraggingStarted = false;

    this.items.forEach((item) => {
      this.addMouseDownListenerToItem(item);
    });

    document.addEventListener('mouseup', () => {
      this.handleStopDragging();
    });

    document.addEventListener('mousemove', (event) => {
      this.isDragging = this.isMouseDown;
      if (this.isDragging) {
        this.handleDragging(event);
        this.onItemMove();
      }
    });
  }

  addMouseDownListenerToItem = (item) => {
    const node = item.getDOMNode();
    node.addEventListener('mousedown', () => {
      this.draggingItem = item;
      this.isMouseDown = true;
    });

    node.ondragstart = () => false;
  };

  addItem = (item) => {
    this.addMouseDownListenerToItem(item);
    this.items.push(item);
  };

  handleStartDragging = (event) => {
    const node = this.draggingItem.getDOMNode();

    const mapScale = this.getMapScale();

    node.classList.add('dragging');

    this.mouseOffsetX = mapScale ** -1 * (event.pageX - node.getBoundingClientRect().left);
    this.mouseOffsetY = mapScale ** -1 * (event.pageY - node.getBoundingClientRect().top);
  };

  handleStopDragging = () => {
    /*
    * Here we're removing 'dragging' class from dragging item
    * click event fires, after mouseup event, and click handler must know,
    * if node was dragged or not, so we add 'has-dragged' attribute to the node,
    * and click handler will set it to false
    * */
    if (this.draggingItem && this.isDragging) {
      const node = this.draggingItem.getDOMNode();
      node.classList.remove('dragging');
      node.setAttribute('has-dragged', true);
    }

    this.isMouseDown = false;
    this.isDragging = false;
    this.draggingItem = null;
    this.mouseOffsetX = null;
    this.mouseOffsetY = null;
    this.hasDraggingStarted = false;
  };

  handleDragging = (event) => {
    if (!this.hasDraggingStarted) {
      this.handleStartDragging(event);
      this.hasDraggingStarted = true;
    }

    const mapOffset = this.getMapOffset();
    const mapScale = this.getMapScale();

    this.draggingItem.setPosition({
      x: event.pageX / mapScale - this.mouseOffsetX + 20 / mapScale - mapOffset.x,
      y: event.pageY / mapScale - this.mouseOffsetY + 20 / mapScale - mapOffset.y,
    });
  }
}
