import Observer from './observer';

/**
 * DielectricConstantManager manages the property called dielectric constant
 *
 * Manager handles changes of the DOM Node and notifies all subscribers
 * Manager has a method for returning a value of dielectric constant
 * */
export default class DielectricConstantManager extends Observer {
  constructor() {
    super();

    this.dielectricConstant = 1;
    const inputDOMNode = document.getElementById('dielectric-constant-input');

    inputDOMNode.addEventListener('input', ({ target: { value } }) => {
      this.dielectricConstant = +value;
      this.notifySubscribers();
    });
  }

  getDielectricConstant = () => this.dielectricConstant;
}
