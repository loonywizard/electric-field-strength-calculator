import Observer from './observer';

export default class ScaleManager extends Observer {
  constructor() {
    super();

    // metres per pixel
    this.scale = 0.5;

    this.scaleMultiplier = 1.5;

    const scaleUpButton = document.getElementById('scale-up-button');
    const scaleDownButton = document.getElementById('scale-down-button');

    scaleUpButton.addEventListener('click', () => {
      this.scale *= this.scaleMultiplier;
      this.notifySubscribers('UP');
    });

    scaleDownButton.addEventListener('click', () => {
      this.scale /= this.scaleMultiplier;
      this.notifySubscribers('DOWN');
    });
  }

  getScale = () => this.scale;

  getScaleMultiplier = () => this.scaleMultiplier;
}