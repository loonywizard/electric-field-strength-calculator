export default function createDnDController(draggableItems) {
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
    draggingItem.getDOMNode().classList.remove('dragging');

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
    if (isDragging && draggingItem) {
      handleStopDragging();
    }
  });

  document.addEventListener('mousemove', (event) => {
    isDragging = isMouseDown;
    if (isDragging) {
      handleDragging(event);
    }
  });

  return {
    addItem,
  };
}