import formatNumber from './formatters';

/**
 * ScaleRuler
 *
 * ScaleRuler displays map scale in control panel
 *
 * @param {MapScaleManager} args.mapScaleManager
 *
 * @method setScaleValue - sets current scale value to HTML
 * */
export default class ScaleRuler {
  constructor(args) {
    const { mapScaleManager } = args;

    this.scaleValueNode = document.getElementById('scale-value');
    this.mapScaleManager = mapScaleManager;
    this.rulerLength = 100;

    this.setScaleValue();
  }

  setScaleValue = () => {
    const mapScale = this.mapScaleManager.getMapScale();

    const { formattedNumber, prefixName } = formatNumber(1 / mapScale * this.rulerLength);

    this.scaleValueNode.innerHTML = `${formattedNumber} ${prefixName}m`;
  };
}
