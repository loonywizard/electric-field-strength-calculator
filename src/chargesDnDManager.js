/**
 * ChargesDnDManager allows us to drag and drop charges, so we can change their positions
 * */
export default class ChargesDnDManager {
  constructor(charges, onChargeMove) {
    this.items = charges;
    this.onItemMove = onChargeMove;

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

    node.classList.add('dragging');

    this.mouseOffsetX = event.pageX - node.getBoundingClientRect().left;
    this.mouseOffsetY = event.pageY - node.getBoundingClientRect().top;
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

    this.draggingItem.setPosition({
      x: event.pageX - this.mouseOffsetX + 20,
      y: event.pageY - this.mouseOffsetY + 20,
    });
  }
}
