import Observer from './observer';

export default class ScaleManager extends Observer {
  constructor() {
    super();

    // metres per pixel
    this.scale = 0.5;

    const scaleMultiplier = 2;

    const scaleUpButton = document.getElementById('scale-up-button');
    const scaleDownButton = document.getElementById('scale-down-button');

    scaleUpButton.addEventListener('click', () => {
      this.scale *= scaleMultiplier;
      this.notifySubscribers();
    });

    scaleDownButton.addEventListener('click', () => {
      this.scale /= scaleMultiplier;
      this.notifySubscribers();
    });
  }

  getScale = () => this.scale;
}