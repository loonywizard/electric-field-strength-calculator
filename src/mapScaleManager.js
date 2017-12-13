import Observer from './observer';
import { SCALING_DIRECTIONS } from './consts';
import minusSvgIcon from './resources/minus.svg';
import plusSvgIcon from './resources/plus.svg';

/**
 * MapScaleManager
 *
 * MapScaleManager allows user to change scale of the map,
 * so user can set any distance between charges and keep them in visible part of map
 *
 * To understand how it works and what it does, let's imagine, that we have 'original' scale,
 * for example one pixel is one meter
 * And with scaling up, we have (1 / scale) meters in one pixel,
 * after scaling down we returns to initial situation with one meter to one pixel
 *
 * @function getScale - returns current scale of map
 * @function getScaleMultiplier - returns scale multiplier
 *
 * @extends Observer
 * */
export default class MapScaleManager extends Observer {
  constructor() {
    super();

    this.scale = 1;

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
