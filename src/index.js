import createElectricCharge from './electricCharge';
import createDnDController from './dndController';

const container = document.getElementById('container');

const charges = [
  createElectricCharge({ position: { x: 40, y: 40}, parentDOMNode: container, charge: 10 }),
  createElectricCharge({ position: { x: 200, y: 40}, parentDOMNode: container, charge: 10 }),
  createElectricCharge({ position: { x: 100, y: 150}, parentDOMNode: container, charge: 10 }),
];

const testCharge = createElectricCharge({
  position: { x: 300, y: 250},
  parentDOMNode: container,
  charge: 10,
  isTest: true,
});

const dndController = createDnDController([...charges, testCharge]);