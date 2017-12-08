import createElectricCharge from './electricCharge';
import ChargesDnDManager from './chargesDnDManager';
import createEFSCalculator from './efcCalculator';
import ScreenSizeManager from './screenSizeManager';
import DielectricConstantManager from './dielectricConstantManager';
import createNewChargeCreator from './newChargeCreator';

import Canvas from './canvas';
import ElectricFieldStrengthVectorVisualiser from './electricFieldStrengthVectorVisualiser';


const screenSizeManager = new ScreenSizeManager();

const canvas = new Canvas(screenSizeManager);
const ctx = canvas.getCtx();
const electricFieldStrengthVectorVisualiser = new ElectricFieldStrengthVectorVisualiser(ctx);

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
  canvas.clear();
  electricFieldStrengthVectorVisualiser.visualise(testChargePosition, angle);
  efsDisplay.innerHTML = `${efs} В/м`;
}

dielectricConstantManager.subscribe(calcAndDisplayEfs);

calcAndDisplayEfs();

const chargesDnDManager = new ChargesDnDManager([...charges, testCharge], calcAndDisplayEfs);