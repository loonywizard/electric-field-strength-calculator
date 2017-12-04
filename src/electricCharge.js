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

  setNodePosition();

  node.className = `charge${isTest ? ' test-charge' : ''}`;

  parentDOMNode.appendChild(node);

  return {
    getPosition,
    getCharge,
    getDOMNode,
    setPosition,
  };
}