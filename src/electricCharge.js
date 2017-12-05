export default function createElectricCharge(args) {
  const {
    isTest = false,
    parentDOMNode,
  } = args;

  let {
    charge,
    position,
  } = args;

  function setNodePosition() {
    node.style.top = `${position.y}px`;
    node.style.left = `${position.x}px`;
  }
  
  const getPosition = () => ({ ...position });
  const getCharge = () => charge;
  const getDOMNode = () => node;

  const setPosition = (newPosition) => {
    position = { ...newPosition };
    setNodePosition();
  };

  const node = document.createElement('div');
  node.className = `charge${isTest ? ' test-charge' : ''}`;

  setNodePosition();

  const chargeInputNode = document.createElement('input');
  chargeInputNode.classList.add('charge-input', 'hidden');
  chargeInputNode.setAttribute('type', 'number');
  chargeInputNode.value = charge;
  
  chargeInputNode.addEventListener('input', () => {
    charge = chargeInputNode.value;
  });

  node.addEventListener('click', (event) => {

    const hasDragged = node.getAttribute('has-dragged');
    if (hasDragged !== null) {
      node.removeAttribute('has-dragged');
    } else if (event.target !== chargeInputNode) {
      chargeInputNode.classList.toggle('hidden');
    }
  });

  node.appendChild(chargeInputNode);

  parentDOMNode.appendChild(node);

  return {
    getPosition,
    getCharge,
    getDOMNode,
    setPosition,
  };
}