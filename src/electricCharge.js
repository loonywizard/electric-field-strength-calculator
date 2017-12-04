export default function createElectricCharge(args) {
  const {
    isTest = false,
    position,
    parentDOMNode,
  } = args;

  let { charge } = args;

  const getPosition = () => ({ ...position });
  const getCharge = () => charge;
  const getDOMNode = () => node;

  const node = document.createElement('div');

  node.style.top = `${position.y}px`;
  node.style.left = `${position.x}px`;

  node.className = `charge${isTest ? ' test-charge' : ''}`;

  parentDOMNode.appendChild(node);

  return {
    getPosition,
    getCharge,
    getDOMNode,
  };
}