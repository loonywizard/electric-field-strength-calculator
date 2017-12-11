import './styles/index.scss';

import ChargesManager from './chargesManager';
import ScreenSizeManager from './screenSizeManager';
import DielectricConstantManager from './dielectricConstantManager';
import ChargesCreator from './chargesCreator';
import Canvas from './canvas';
import ElectricFieldStrengthManager from './electricFieldStrengthManager';
import MapOffsetManager from './mapOffsetManager';

const screenSizeManager = new ScreenSizeManager();

const canvas = new Canvas(screenSizeManager);

const dielectricConstantManager = new DielectricConstantManager();

const mapOffsetManager = new MapOffsetManager(canvas.getDOMNode());

const chargesManager = new ChargesManager(mapOffsetManager);

const electricFieldStrengthManager = new ElectricFieldStrengthManager(
  chargesManager,
  dielectricConstantManager,
  canvas,
  mapOffsetManager,
);

const chargesCreator = new ChargesCreator();

mapOffsetManager.subscribe(chargesManager.updateChargesPositions);
mapOffsetManager.subscribe(electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength);

chargesCreator.subscribe(chargesManager.addCharge);

chargesManager.subscribe(electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength);

dielectricConstantManager.subscribe(
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
);

electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength();
