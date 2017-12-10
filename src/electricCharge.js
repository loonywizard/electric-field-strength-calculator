import ChargeInput from './chargeInput';

export default class ElectricCharge {
  constructor(args) {
    let {
      isTest = false,
      parentDOMNode,
      onChargeInput,
      value,
      siPrefixName,
      position,
    } = args;

    this.isTest = isTest;
    this.parentDOMNode = parentDOMNode;
    this.onChargeInput = onChargeInput;
    this.value = value;
    this.siPrefixName = siPrefixName;
    this.position = position;

    this.node = document.createElement('div');
    this.node.className = `charge${isTest ? ' test-charge' : ''}`;

    this.setNodePosition();

    const chargeInputNode = document.createElement('div');

    chargeInputNode.classList.add('charge-input', 'hidden');

    new ChargeInput({
      parentNode: chargeInputNode,
      value,
      siPrefixName,
      onChargeInput: ({ value, siPrefixName }) => {
        this.value = value;
        this.siPrefixName = siPrefixName;

        onChargeInput();
      },
    });

    this.node.addEventListener('click', (event) => {
      const hasDragged = this.node.getAttribute('has-dragged');
      if (hasDragged !== null) {
        this.node.removeAttribute('has-dragged');
      } else if (event.target === this.node) {
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
  getCharge = () => ({
    siPrefixName: this.siPrefixName,
    value: this.value,
  });
  getDOMNode = () => this.node;

  setPosition = (newPosition) => {
    this.position = { ...newPosition };
    this.setNodePosition();
  };
}