/*
* ElectricFieldStrengthCalculator calculates Electric Field Strength
*
* Electric Field Strength from one charge to another is k * q / r ** 2,
* where q - charge, r - distance between charge and test charge, k = 9 * 10 ** 9
*
* Electric Field Strength of all field is sum of all vectors of efs
* */

import { SI_PREFIXES } from './consts';

const k = 9 * 10 ** 9;

export default class ElectricFieldStrengthCalculator {
  constructor(chargesManager, dielectricConstantManager) {
    this.chargesManager = chargesManager;
    this.dielectricConstantManager = dielectricConstantManager;
  }

  calculate = () => {
    const testCharge = this.chargesManager.getTestCharge();
    const charges = this.chargesManager.getCharges();
    const dielectricConstant = this.dielectricConstantManager.getDielectricConstant();

    const testChargePosition = testCharge.getPosition();

    let xEfs = 0;
    let yEfs = 0;

    charges.forEach((charge) => {
      const { value: chargeValue, siPrefixName: chargeSiPrefixName } = charge.getCharge();
      const q = chargeValue * SI_PREFIXES[chargeSiPrefixName].value;
      const chargePosition = charge.getPosition();
      const dx = testChargePosition.x - chargePosition.x;
      const dy = testChargePosition.y - chargePosition.y;
      const r = (dx ** 2 + dy ** 2) ** 0.5;
      const chargeEfs = k * q / (r ** 2);
      const chargeAngle = Math.atan2(dy, dx);
      xEfs += chargeEfs * Math.cos(chargeAngle);
      yEfs += chargeEfs * Math.sin(chargeAngle);
    });

    const efs = (xEfs ** 2 + yEfs ** 2) ** 0.5 / dielectricConstant;

    const angle = Math.atan2(yEfs, xEfs);

    return {
      efs, angle,
    };
  };
}
