export function drawArrow({ ctx, position, angle, length = 300 }) {
  const arrowLength = 35;
  const arrowWidth = 8;
  const phi = Math.atan2(arrowWidth, arrowLength);

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
    position.x + length * Math.cos(angle) - arrowLength * Math.cos(angle - phi),
    position.y + length * Math.sin(angle) - arrowLength * Math.sin(angle - phi),
  );
  ctx.lineTo(
    position.x + (length - arrowLength * 0.75) * Math.cos(angle),
    position.y + (length - arrowLength * 0.75) * Math.sin(angle),
  );
  ctx.lineTo(
    position.x + length * Math.cos(angle) - arrowLength * Math.cos(angle + phi),
    position.y + length * Math.sin(angle) - arrowLength * Math.sin(angle + phi),
  );
  ctx.lineTo(
    position.x + length * Math.cos(angle),
    position.y + length * Math.sin(angle),
  );

  ctx.stroke();
  ctx.fill();
}