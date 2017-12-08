export default class ElectricCharge {
  constructor(args) {
    let {
      isTest = false,
      parentDOMNode,
      onChargeInput,
      charge,
      position,
    } = args;

    this.isTest = isTest;
    this.parentDOMNode = parentDOMNode;
    this.onChargeInput = onChargeInput;
    this.charge = charge;
    this.position = position;

    this.node = document.createElement('div');
    this.node.className = `charge${isTest ? ' test-charge' : ''}`;

    this.setNodePosition();

    const chargeInputNode = document.createElement('input');

    chargeInputNode.classList.add('charge-input', 'hidden');
    chargeInputNode.setAttribute('type', 'number');
    chargeInputNode.value = charge;

    chargeInputNode.addEventListener('input', () => {
      this.charge = chargeInputNode.value;
      onChargeInput();
    });

    this.node.addEventListener('click', (event) => {
      const hasDragged = this.node.getAttribute('has-dragged');
      if (hasDragged !== null) {
        this.node.removeAttribute('has-dragged');
      } else if (event.target !== chargeInputNode) {
        chargeInputNode.classList.toggle('hidden');
      }
    });

    this.node.appendChild(chargeInputNode);

    parentDOMNode.appendChild(this.node);
  }

  setNodePosition = () => {
    this.node.style.top = `${this.position.y}px`;
    this.node.style.left = `${this.position.x}px`;
  };

  getPosition = () => ({ ...this.position });
  getCharge = () => this.charge;
  getDOMNode = () => this.node;

  setPosition = (newPosition) => {
    this.position = { ...newPosition };
    this.setNodePosition();
  };
}