import createElectricCharge from './electricCharge';
import createDnDController from './dndController';
import createEFSCalculator from './efcCalculator';

const container = document.getElementById('container');

const charges = [
  createElectricCharge({ position: { x: 40, y: 40}, parentDOMNode: container, charge: -10 }),
  createElectricCharge({ position: { x: 200, y: 40}, parentDOMNode: container, charge: 10 }),
  createElectricCharge({ position: { x: 100, y: 150}, parentDOMNode: container, charge: -5 }),
];

const testCharge = createElectricCharge({
  position: { x: 300, y: 250},
  parentDOMNode: container,
  charge: 10,
  isTest: true,
});

const efsCalculator = createEFSCalculator(charges, testCharge);

const onItemMove = efsCalculator.calculate;

const dndController = createDnDController([...charges, testCharge], onItemMove);