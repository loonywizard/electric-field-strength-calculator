import Observer from './observer';
import { SCALING_DIRECTIONS } from './consts';
import minusSvgIcon from './resources/minus.svg';
import plusSvgIcon from './resources/plus.svg';

export default class ScaleManager extends Observer {
  constructor() {
    super();

    // metres per pixel
    this.scale = 0.5;

    this.scaleMultiplier = 1.5;

    const scaleUpButton = document.getElementById('scale-up-button');
    const scaleDownButton = document.getElementById('scale-down-button');

    scaleUpButton.innerHTML = plusSvgIcon;
    scaleDownButton.innerHTML = minusSvgIcon;

    scaleUpButton.addEventListener('click', () => {
      this.scale *= this.scaleMultiplier;
      this.notifySubscribers(SCALING_DIRECTIONS.UP);
    });

    scaleDownButton.addEventListener('click', () => {
      this.scale /= this.scaleMultiplier;
      this.notifySubscribers(SCALING_DIRECTIONS.DOWN);
    });
  }

  getScale = () => this.scale;

  getScaleMultiplier = () => this.scaleMultiplier;
}