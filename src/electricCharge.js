import ChargeInput from './chargeInput';
import { SI_PREFIXES } from './consts'

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

    this.node.addEventListener('click', (event) => {
      const hasDragged = this.node.getAttribute('has-dragged');
      if (hasDragged !== null) {
        this.node.removeAttribute('has-dragged');
      }
    });

    if (isTest) {
      this.electricFieldStrengthDisplayNode = document.createElement('div');
      this.electricFieldStrengthDisplayNode.classList.add('efs-display');
      this.node.appendChild(this.electricFieldStrengthDisplayNode);

      this.getElectricFieldStrengthDisplayNode = () => this.electricFieldStrengthDisplayNode;
    } else {
      const chargeInputNode = document.createElement('div');
      const chargeInputApplyButton = document.createElement('button');
      const chargeDisplayNode = document.createElement('div');

      chargeDisplayNode.innerHTML = `Q = ${(this.value * SI_PREFIXES[this.siPrefixName].value).toExponential(5)} C`;

      chargeInputApplyButton.innerHTML = 'Apply';

      chargeInputNode.appendChild(chargeInputApplyButton);

      chargeInputNode.classList.add('charge-input', 'hidden');
      chargeDisplayNode.classList.add('charge-display');

      const chargeInput = new ChargeInput({
        parentNode: chargeInputNode,
        value,
        siPrefixName,
        onChargeInput: ({value, siPrefixName}) => {
          this.value = value;
          this.siPrefixName = siPrefixName;
          chargeDisplayNode.innerHTML = `Q = ${(this.value * SI_PREFIXES[this.siPrefixName].value).toExponential(5)} C`;

          onChargeInput();
        },
      });

      chargeDisplayNode.addEventListener('click', () => {
        chargeDisplayNode.classList.toggle('hidden');
        chargeInputNode.classList.toggle('hidden');
      });

      chargeInputApplyButton.addEventListener('click', () => {
        chargeDisplayNode.classList.toggle('hidden');
        chargeInputNode.classList.toggle('hidden');
      });

      this.node.appendChild(chargeInputNode);
      this.node.appendChild(chargeDisplayNode);
    }

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