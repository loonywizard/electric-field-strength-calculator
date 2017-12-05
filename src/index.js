import createElectricCharge from './electricCharge';
import createDnDController from './dndController';
import createEFSCalculator from './efcCalculator';
import createScreenSizeController from './screenSizeController';

const container = document.getElementById('container');

const efsDisplay = document.getElementById('efs-display');

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const screenSizeController = createScreenSizeController();

function setCanvasSize() {
  const screenSize = screenSizeController.getScreenSize();
  canvas.width = screenSize.x;
  canvas.height = screenSize.y;
}

setCanvasSize();

screenSizeController.subscribe(setCanvasSize);

const charges = [
  createElectricCharge({ position: { x: 40, y: 140}, parentDOMNode: container, charge: 10 }),
  createElectricCharge({ position: { x: 200, y: 140}, parentDOMNode: container, charge: 10 }),
  createElectricCharge({ position: { x: 100, y: 250}, parentDOMNode: container, charge: 10 }),
];

const testCharge = createElectricCharge({
  position: { x: 300, y: 350},
  parentDOMNode: container,
  charge: 10,
  isTest: true,
});

const efsCalculator = createEFSCalculator(charges, testCharge);

const calcAndDisplayEfs = () => {
  const { efs, angle } = efsCalculator.calculate();
  const testChargePosition = testCharge.getPosition();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.moveTo(testChargePosition.x, testChargePosition.y);
  ctx.lineTo(testChargePosition.x + 100 * Math.cos(angle), testChargePosition.y + 100 * Math.sin(angle));
  ctx.stroke();
  efsDisplay.innerHTML = `${efs} В/м`;
};

calcAndDisplayEfs();

const dndController = createDnDController([...charges, testCharge], calcAndDisplayEfs);