/**
 * This file contains functions for drawing specific shapes on canvas
 * */

/**
 * This function draws arrow on given canvas
 *
 * @param {CanvasCtx} args.ctx
 * @param {Object} args.position
 * @param {Number} args.angle
 * @param {Number} args.length = 300
 * */
export function drawArrow(args) {
  const {
    ctx, position, angle, length = 300,
  } = args;

  const arrowTip = 35;
  const arrowWidth = 8;
  const phi = Math.atan2(arrowWidth, arrowTip);

  ctx.save();

  ctx.fillStyle = '#000';
  ctx.lineWidth = 3;

  // draw a line
  ctx.beginPath();

  ctx.moveTo(position.x, position.y);
  ctx.lineTo(
    position.x + (length - 5) * Math.cos(angle),
    position.y + (length - 5) * Math.sin(angle),
  );

  ctx.stroke();

  // draw an arrow
  ctx.beginPath();

  ctx.lineWidth = 1;

  ctx.lineTo(
    position.x + length * Math.cos(angle),
    position.y + length * Math.sin(angle),
  );
  ctx.lineTo(
    position.x + length * Math.cos(angle) - arrowTip * Math.cos(angle - phi),
    position.y + length * Math.sin(angle) - arrowTip * Math.sin(angle - phi),
  );
  ctx.lineTo(
    position.x + (length - arrowTip * 0.75) * Math.cos(angle),
    position.y + (length - arrowTip * 0.75) * Math.sin(angle),
  );
  ctx.lineTo(
    position.x + length * Math.cos(angle) - arrowTip * Math.cos(angle + phi),
    position.y + length * Math.sin(angle) - arrowTip * Math.sin(angle + phi),
  );
  ctx.lineTo(
    position.x + length * Math.cos(angle),
    position.y + length * Math.sin(angle),
  );

  ctx.stroke();
  ctx.fill();

  ctx.restore();
}
