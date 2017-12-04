export default function createDnDController(draggableItems) {
  const items = [...draggableItems];

  let isMouseDown = false;
  let isDragging = false;
  let draggingItem = null;
  let mouseOffsetX = null;
  let mouseOffsetY = null;
  let hasDraggingStarted = false;

  const addMouseDownListenerToItem = (item) => {
    item.addEventListener('mousedown', () => {
      draggingItem = item;
      isMouseDown = true;
    });
  };

  const addItem = (item) => {
    addMouseDownListenerToItem(item);
    items.push(item);
  };

  function handleStartDragging(event) {
    draggingItem.classList.add('dragging');

    mouseOffsetX = event.pageX - draggingItem.getBoundingClientRect().left;
    mouseOffsetY = event.pageY - draggingItem.getBoundingClientRect().top;
  }

  function handleStopDragging() {
    draggingItem.classList.remove('dragging');

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

    draggingItem.style.top = event.pageY - mouseOffsetY +20 +'px';
    draggingItem.style.left = event.pageX - mouseOffsetX +20 + 'px';
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