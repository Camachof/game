
const MovingObject = function(options){
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
  this.size = options.size;
};

MovingObject.prototype.draw = function(ctx){
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] -= this.vel[0];
  this.pos[1] -= this.vel[1];

  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  const sumRadii = this.radius + otherObject.radius;
  const xDiff = Math.pow(this.pos[0] - otherObject.pos[0], 2);
  const yDiff = Math.pow(this.pos[1] - otherObject.pos[1], 2);
  const Distance = Math.sqrt(xDiff + yDiff);

  return Distance < sumRadii;
};

module.exports = MovingObject;
