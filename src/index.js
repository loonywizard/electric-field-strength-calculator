import ChargesManager from './chargesManager';
import ScreenSizeManager from './screenSizeManager';
import DielectricConstantManager from './dielectricConstantManager';
import createNewChargeCreator from './newChargeCreator';
import Canvas from './canvas';

import ElectricFieldStrengthManager from './electricFieldStrengthManager';

const screenSizeManager = new ScreenSizeManager();

const canvas = new Canvas(screenSizeManager);

const dielectricConstantManager = new DielectricConstantManager();

const chargesManager = new ChargesManager();

const electricFieldStrengthManager = new ElectricFieldStrengthManager(
  chargesManager, dielectricConstantManager, canvas,
);

chargesManager.init(electricFieldStrengthManager.calcAndDisplayEfs);

const chargesCreator = createNewChargeCreator(chargesManager.addCharge);

dielectricConstantManager.subscribe(
  electricFieldStrengthManager.calcAndDisplayEfs,
);

electricFieldStrengthManager.calcAndDisplayEfs();