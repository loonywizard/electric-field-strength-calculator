/*
* efcCalculator counts Electric Field Strength
* EFS from one charge to another is k * q / r ** 2,
* where q - charge, r - distance between charge and test charge, k = 9 * 10 ** 9
*
* EFS From all field is sum of all vectors of efs
* */

// TODO: rename efc to efs everywhere!!
const k = 9 * 10 ** 9;

export default function createEFSCalculator(charges, testCharge, dielectricConstantController) {
  const calculate = () => {
    const testChargePosition = testCharge.getPosition();
    const dielectricConstant = dielectricConstantController.getDielectricConstant();

    let xEfs = 0;
    let yEfs = 0;

    charges.forEach(charge => {
      const q = charge.getCharge();
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
    }
  };

  return {
    calculate,
  };
}