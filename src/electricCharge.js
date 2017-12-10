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
      const chargeInputApplyButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const chargeDisplayNode = document.createElement('div');

      chargeInputApplyButton.classList.add('close-icon');

      chargeInputApplyButton.innerHTML = `<?xml version='1.0' encoding='iso-8859-1'?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.9 21.9" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 21.9 21.9">
  <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
</svg>`;

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