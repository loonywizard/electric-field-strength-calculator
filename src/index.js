import createElectricCharge from './electricCharge';
import ChargesDnDManager from './chargesDnDManager';
import createEFSCalculator from './efcCalculator';
import ScreenSizeManager from './screenSizeManager';
import DielectricConstantManager from './dielectricConstantManager';
import createNewChargeCreator from './newChargeCreator';

const createChargeCallback = (chargeValue) => {
  const charge = createElectricCharge({
    position: { x: 400, y: 400 },
    parentDOMNode: container,
    charge: chargeValue,
    onChargeInput: calcAndDisplayEfs,
  });
  charges.push(charge);
  chargesDnDManager.addItem(charge);
  calcAndDisplayEfs();
};

const chargesCreator = createNewChargeCreator(createChargeCallback);

const dielectricConstantManager = new DielectricConstantManager();

const container = document.getElementById('container');

const efsDisplay = document.getElementById('efs-display');

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const screenSizeManager = new ScreenSizeManager();

function setCanvasSize() {
  const screenSize = screenSizeManager.getScreenSize();
  canvas.width = screenSize.x;
  canvas.height = screenSize.y;
}

setCanvasSize();

screenSizeManager.subscribe(setCanvasSize);

const charges = [
  createElectricCharge({
    position: { x: 100, y: 250 },
    parentDOMNode: container,
    charge: 10,
    onChargeInput: calcAndDisplayEfs,
  }),
];

const testCharge = createElectricCharge({
  position: { x: 300, y: 350},
  parentDOMNode: container,
  charge: 10,
  isTest: true,
  onChargeInput: calcAndDisplayEfs,
});

const efsCalculator = createEFSCalculator(testCharge, dielectricConstantManager);

function calcAndDisplayEfs() {
  const { efs, angle } = efsCalculator.calculate(charges);
  const testChargePosition = testCharge.getPosition();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.moveTo(testChargePosition.x, testChargePosition.y);
  ctx.lineTo(testChargePosition.x + 100 * Math.cos(angle), testChargePosition.y + 100 * Math.sin(angle));
  ctx.stroke();
  efsDisplay.innerHTML = `${efs} В/м`;
}

dielectricConstantManager.subscribe(calcAndDisplayEfs);

calcAndDisplayEfs();

const chargesDnDManager = new ChargesDnDManager([...charges, testCharge], calcAndDisplayEfs);