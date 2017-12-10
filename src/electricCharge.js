import ChargeInput from './chargeInput';
import { SI_PREFIXES } from './consts'
import closeSvgIcon from './resources/close-icon.svg';

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
      const chargeInputApplyButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const chargeDisplayNode = document.createElement('div');

      chargeInputApplyButton.classList.add('close-icon');

      chargeInputApplyButton.innerHTML = closeSvgIcon;

      chargeDisplayNode.innerHTML = `Q = ${(this.value * SI_PREFIXES[this.siPrefixName].value).toExponential(5)} C`;


      chargeInputNode.classList.add('edit-charge-container', 'hidden');
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
        chargeDisplayNode.classList.add('hidden');
        chargeInputNode.classList.remove('hidden');
        this.node.classList.add('charge-editing');
      });

      chargeInputApplyButton.addEventListener('click', () => {
        chargeDisplayNode.classList.remove('hidden');
        chargeInputNode.classList.add('hidden');
        this.node.classList.remove('charge-editing');
      });


      chargeInputNode.appendChild(chargeInputApplyButton);

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