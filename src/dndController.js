export default function createDnDController(draggableItems, onItemMove) {
  const items = [...draggableItems];

  let isMouseDown = false;
  let isDragging = false;
  let draggingItem = null;
  let mouseOffsetX = null;
  let mouseOffsetY = null;
  let hasDraggingStarted = false;

  const addMouseDownListenerToItem = (item) => {
    const node = item.getDOMNode();
    node.addEventListener('mousedown', () => {
      draggingItem = item;
      isMouseDown = true;
    });

    node.ondragstart = () => false;
  };

  const addItem = (item) => {
    addMouseDownListenerToItem(item);
    items.push(item);
  };

  function handleStartDragging(event) {
    const node = draggingItem.getDOMNode();

    node.classList.add('dragging');

    mouseOffsetX = event.pageX - node.getBoundingClientRect().left;
    mouseOffsetY = event.pageY - node.getBoundingClientRect().top;
  }

  function handleStopDragging() {
    /*
    * Here we're removing 'dragging' class from dragging item
    * click event fires, after mouseup event, and click handler must know,
    * if node was dragged or not, so we add 'has-dragged' attribute to the node,
    * and click handler will set it to false
    * */
    if (draggingItem && isDragging) {
      const node = draggingItem.getDOMNode();
      node.classList.remove('dragging');
      node.setAttribute('has-dragged', true);
    }

    isMouseDown = false;
    isDragging = false;
    draggingItem = null;
    mouseOffsetX = null;
    mouseOffsetY = null;
    hasDraggingStarted = false;
  }

  function handleDragging(event) {
    if (!hasDraggingStarted) {
      handleStartDragging(event);
      hasDraggingStarted = true;
    }

    draggingItem.setPosition({
      x: event.pageX - mouseOffsetX + 20,
      y: event.pageY - mouseOffsetY + 20,
    })
  }

  items.forEach(item => {
    addMouseDownListenerToItem(item);
  });

  document.addEventListener('mouseup', () => {
    handleStopDragging();
  });

  document.addEventListener('mousemove', (event) => {
    isDragging = isMouseDown;
    if (isDragging) {
      handleDragging(event);
      onItemMove();
    }
  });

  return {
    addItem,
  };
}