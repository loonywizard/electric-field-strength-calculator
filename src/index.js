import './styles/index.scss';

import ChargesManager from './chargesManager';
import ScreenSizeManager from './screenSizeManager';
import DielectricConstantManager from './dielectricConstantManager';
import ChargesCreator from './chargesCreator';
import Canvas from './canvas';
import ElectricFieldStrengthManager from './electricFieldStrengthManager';

const screenSizeManager = new ScreenSizeManager();

const canvas = new Canvas(screenSizeManager);

const dielectricConstantManager = new DielectricConstantManager();

const chargesManager = new ChargesManager();

const electricFieldStrengthManager = new ElectricFieldStrengthManager(
  chargesManager, dielectricConstantManager, canvas,
);

const chargesCreator = new ChargesCreator(chargesManager.addCharge);

chargesManager.subscribe(
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
);

dielectricConstantManager.subscribe(
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
);

electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength();