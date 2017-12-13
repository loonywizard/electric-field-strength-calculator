import './styles/index.scss';

import ChargesManager from './chargesManager';
import ScreenSizeManager from './screenSizeManager';
import DielectricConstantManager from './dielectricConstantManager';
import ChargesCreator from './chargesCreator';
import Canvas from './canvas';
import ElectricFieldStrengthManager from './electricFieldStrengthManager';
import MapOffsetManager from './mapOffsetManager';
import ScaleManager from './scaleManager';
import ScaleRuler from './scaleRuler';
import MapGrid from './mapGrid';

const scaleManager = new ScaleManager();

const scaleRuler = new ScaleRuler(scaleManager);

const screenSizeManager = new ScreenSizeManager();

const canvas = new Canvas(screenSizeManager);

const dielectricConstantManager = new DielectricConstantManager();

const mapOffsetManager = new MapOffsetManager(canvas.getDOMNode(), scaleManager, screenSizeManager);

const mapGrid = new MapGrid(canvas, mapOffsetManager, screenSizeManager, scaleManager);

const chargesManager = new ChargesManager(mapOffsetManager, scaleManager, screenSizeManager);

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
  mapOffsetManager.onMapScale,
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
  scaleRuler.setScaleValue,
  mapGrid.visualise,
);

mapOffsetManager.subscribe(
  chargesManager.updateChargesPositions,
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
  mapGrid.visualise,
);

chargesCreator.subscribe(chargesManager.addCharge);

chargesManager.subscribe(
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
  mapGrid.visualise,
);

dielectricConstantManager.subscribe(
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
);

electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength();

mapGrid.visualise();