import './styles/index.scss';

import ChargesManager from './chargesManager';
import ScreenSizeManager from './screenSizeManager';
import DielectricConstantManager from './dielectricConstantManager';
import ChargesCreator from './chargesCreator';
import Canvas from './canvas';
import ElectricFieldStrengthManager from './electricFieldStrengthManager';
import MapOffsetManager from './mapOffsetManager';
import ScaleManager from './scaleManager';

const scaleManager = new ScaleManager();

const screenSizeManager = new ScreenSizeManager();

const canvas = new Canvas(screenSizeManager);

const dielectricConstantManager = new DielectricConstantManager();

const mapOffsetManager = new MapOffsetManager(canvas.getDOMNode(), scaleManager, screenSizeManager);

const chargesManager = new ChargesManager(mapOffsetManager, scaleManager);

const electricFieldStrengthManager = new ElectricFieldStrengthManager(
  chargesManager,
  dielectricConstantManager,
  canvas,
  mapOffsetManager,
  scaleManager,
);

const chargesCreator = new ChargesCreator();

scaleManager.subscribe(
  chargesManager.updateChargesPositions,
);

scaleManager.subscribe(
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
);

scaleManager.subscribe(mapOffsetManager.onMapScale);

mapOffsetManager.subscribe(chargesManager.updateChargesPositions);
mapOffsetManager.subscribe(electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength);

chargesCreator.subscribe(chargesManager.addCharge);

chargesManager.subscribe(electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength);

dielectricConstantManager.subscribe(
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
);

electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength();
