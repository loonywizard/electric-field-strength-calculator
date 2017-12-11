export default class ScaleRuler {
  constructor(mapScaleManager) {
    this.scaleValueNode = document.getElementById('scale-value');
    this.mapScaleManager = mapScaleManager;

    this.setScaleValue();
  }

  setScaleValue = () => {
    const mapScale = this.mapScaleManager.getScale();

    this.scaleValueNode.innerHTML = `${(mapScale * 100).toExponential(2)}m`;
  };
}