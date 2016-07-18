
const Ship = function(){
  this.xPos = (1000 - 75) / 2;
  this.yPos = 580;
};

Ship.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.moveTo(this.xPos, this.yPos);
  ctx.lineTo(this.xPos + 15, this.yPos - 45);
  ctx.lineTo(this.xPos + 30, this.yPos);
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
};

module.exports = Ship;
