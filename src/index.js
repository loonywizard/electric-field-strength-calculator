import './styles/index.scss';

import ChargesManager from './chargesManager';
import ScreenSizeManager from './screenSizeManager';
import DielectricConstantManager from './dielectricConstantManager';
import ChargesCreator from './chargesCreator';
import Canvas from './canvas';
import ElectricFieldStrengthManager from './electricFieldStrengthManager';
import MapOffsetManager from './mapOffsetManager';
import MapScaleManager from './mapScaleManager';
import ScaleRuler from './scaleRuler';
import MapGrid from './mapGrid';

const mapScaleManager = new MapScaleManager();

const scaleRuler = new ScaleRuler({ mapScaleManager });

const screenSizeManager = new ScreenSizeManager();

const canvas = new Canvas({ screenSizeManager });

const dielectricConstantManager = new DielectricConstantManager();

const mapOffsetManager = new MapOffsetManager({
  canvasNode: canvas.getDOMNode(),
  mapScaleManager,
  screenSizeManager,
});

const mapGrid = new MapGrid({
  canvas,
  mapOffsetManager,
  screenSizeManager,
  mapScaleManager,
});

const chargesManager = new ChargesManager(mapOffsetManager, mapScaleManager, screenSizeManager);

const electricFieldStrengthManager = new ElectricFieldStrengthManager(
  chargesManager,
  dielectricConstantManager,
  canvas,
  mapOffsetManager,
  mapScaleManager,
);

const chargesCreator = new ChargesCreator();

mapScaleManager.subscribe(
  chargesManager.updateChargesPositions,
  mapOffsetManager.onMapScale,
  scaleRuler.setScaleValue,
  canvas.clear,
  mapGrid.visualise,
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
);

mapOffsetManager.subscribe(
  chargesManager.updateChargesPositions,
  canvas.clear,
  mapGrid.visualise,
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
);

chargesCreator.subscribe(chargesManager.addCharge);

chargesManager.subscribe(
  canvas.clear,
  mapGrid.visualise,
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
);

screenSizeManager.subscribe(
  canvas.onScreenSizeChange,
  canvas.clear,
  mapGrid.visualise,
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
);

dielectricConstantManager.subscribe(
  electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength,
);

mapGrid.visualise();

electricFieldStrengthManager.calculateAndDisplayElectricFieldStrength();
