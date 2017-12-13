import ChargeInput from './chargeInput';
import { SI_PREFIXES } from './consts';
import closeSvgIcon from './resources/close-icon.svg';

/**
 * ElectricCharge
 *
 * @param {Boolean} args.isTest
 * @param {DOMNode} args.parentDOMNode
 * @param {Function} args.onChargeInput
 * @param {Number} args.value
 * @param {String} args.siPrefixName
 * @param {Object} args.position
 * @param {Function} args.getMapOffset
 * @param {Function} args.getMapScale
 *
 * @function setPosition
 *
 * @function getPosition
 * @function getCharge
 * @function getDOMNode
 * */
export default class ElectricCharge {
  constructor(args) {
    const {
      isTest,
      parentDOMNode,
      onChargeInput,
      value,
      siPrefixName,
      position,
      getMapOffset,
      getMapScale,
    } = args;

    this.isTest = isTest;
    this.parentDOMNode = parentDOMNode;
    this.onChargeInput = onChargeInput;
    this.value = value;
    this.siPrefixName = siPrefixName;
    this.position = position;
    this.getMapOffset = getMapOffset;
    this.getMapScale = getMapScale;

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
        onChargeInput: ({ value: newValue, siPrefixName: newSiPrefixName }) => {
          this.value = newValue;
          this.siPrefixName = newSiPrefixName;
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
    const mapScale = this.getMapScale();

    this.node.style.top = `${mapScale * (this.position.y + mapOffset.y)}px`;
    this.node.style.left = `${mapScale * (this.position.x + mapOffset.x)}px`;
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
