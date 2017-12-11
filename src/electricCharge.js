import ChargeInput from './chargeInput';
import { SI_PREFIXES } from './consts';
import closeSvgIcon from './resources/close-icon.svg';

export default class ElectricCharge {
  constructor(args) {
    this.isTest = args.isTest;
    this.parentDOMNode = args.parentDOMNode;
    this.onChargeInput = args.onChargeInput;
    this.value = args.value;
    this.siPrefixName = args.siPrefixName;
    this.position = args.position;
    this.getMapOffset = args.getMapOffset;

    this.node = document.createElement('div');
    this.node.className = `charge${this.isTest ? ' test-charge' : ''}`;

    this.setNodePosition();

    this.node.addEventListener('click', () => {
      const hasDragged = this.node.getAttribute('has-dragged');
      if (hasDragged !== null) {
        this.node.removeAttribute('has-dragged');
      }
    });

    if (this.isTest) {
      this.electricFieldStrengthDisplayNode = document.createElement('div');
      this.electricFieldStrengthDisplayNode.classList.add('efs-display');
      this.node.appendChild(this.electricFieldStrengthDisplayNode);

      this.getElectricFieldStrengthDisplayNode = () => this.electricFieldStrengthDisplayNode;
    } else {
      this.chargeDisplayNode = document.createElement('div');
      const editChargeContainer = document.createElement('div');
      const closeIconContainer = document.createElement('div');

      closeIconContainer.classList.add('close-icon');

      closeIconContainer.innerHTML = closeSvgIcon;

      editChargeContainer.classList.add('edit-charge-container', 'hidden');
      this.chargeDisplayNode.classList.add('charge-display');

      const chargeInput = new ChargeInput({
        value: this.value,
        siPrefixName: this.siPrefixName,
        onChargeInput: ({ value, siPrefixName }) => {
          this.value = value;
          this.siPrefixName = siPrefixName;
          this.displayChargeValue();
          this.onChargeInput();
        },
      });

      this.chargeDisplayNode.addEventListener('click', () => {
        this.chargeDisplayNode.classList.add('hidden');
        editChargeContainer.classList.remove('hidden');
        this.node.classList.add('charge-editing');
      });

      closeIconContainer.addEventListener('click', () => {
        this.chargeDisplayNode.classList.remove('hidden');
        editChargeContainer.classList.add('hidden');
        this.node.classList.remove('charge-editing');
      });

      this.displayChargeValue();

      editChargeContainer.appendChild(chargeInput.render());
      editChargeContainer.appendChild(closeIconContainer);

      this.node.appendChild(editChargeContainer);
      this.node.appendChild(this.chargeDisplayNode);
    }

    this.parentDOMNode.appendChild(this.node);
  }

  displayChargeValue = () => {
    const q = this.value * SI_PREFIXES[this.siPrefixName].value;
    this.chargeDisplayNode.innerHTML = `Q = ${q.toExponential(5)} C`;
  };

  setNodePosition = () => {
    const mapOffset = this.getMapOffset();

    this.node.style.top = `${this.position.y + mapOffset.y}px`;
    this.node.style.left = `${this.position.x + mapOffset.x}px`;
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
