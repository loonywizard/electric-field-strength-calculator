import ChargesManager from './chargesManager';
import ElectricFieldStrengthCalculator from './electricFieldStrengthCalculator';
import ScreenSizeManager from './screenSizeManager';
import DielectricConstantManager from './dielectricConstantManager';
import createNewChargeCreator from './newChargeCreator';
import Canvas from './canvas';
import ElectricFieldStrengthVectorVisualiser from './electricFieldStrengthVectorVisualiser';

const screenSizeManager = new ScreenSizeManager();

const canvas = new Canvas(screenSizeManager);
const ctx = canvas.getCtx();

const dielectricConstantManager = new DielectricConstantManager();

const efsDisplay = document.getElementById('efs-display');


const chargesManager = new ChargesManager(calcAndDisplayEfs);

const electricFieldStrengthCalculator = new ElectricFieldStrengthCalculator(
  chargesManager, dielectricConstantManager,
);
const electricFieldStrengthVectorVisualiser = new ElectricFieldStrengthVectorVisualiser(ctx);

const chargesCreator = createNewChargeCreator(chargesManager.addCharge);

function calcAndDisplayEfs() {
  const { efs, angle } = electricFieldStrengthCalculator.calculate();
  canvas.clear();
  electricFieldStrengthVectorVisualiser.visualise(
    chargesManager.getTestCharge().getPosition(), angle,
  );
  efsDisplay.innerHTML = `${efs} В/м`;
}

dielectricConstantManager.subscribe(calcAndDisplayEfs);

calcAndDisplayEfs();