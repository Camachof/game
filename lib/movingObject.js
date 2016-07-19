
const MovingObject = function(options){
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
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
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];

  this.applyBounds(this.pos);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  const sumRadii = this.radius + otherObject.radius;
  const xDiff = Math.pow(this.pos[0] - otherObject.pos[0], 2);
  const yDiff = Math.pow(this.pos[1] - otherObject.pos[1], 2);
  const Distance = Math.sqrt(xDiff + yDiff);

  return Distance < sumRadii;
};

MovingObject.prototype.collisionMerge = function (otherCell) {
  const minSize = 1;

  if (this.radius > otherCell.raidus){
    this.radius += otherCell.raidus / 4;
    otherCell.radius -= otherCell.raidus / 4;

    if(otherCell.raidus <= 1){
      this.game.remove(otherCell);
    }
  } else if (this.radius < otherCell.raidus){
    this.radius -= otherCell.radius / 4;
    otherCell.radius += otherCell.raidus / 4;

    if(this.raidus <= 1){
      this.game.remove(this);
    }
  }
};

MovingObject.prototype.checkBounds = function (pos) {
  if(pos[0] <= 0 + this.radius || pos[0] >= this.game.DIM_X - this.radius){
    return "x";
  } else if (pos[1] <= 0 + this.radius || pos[1] >= this.game.DIM_Y - this.radius){
    return "y";
  }
};

MovingObject.prototype.applyBounds = function (pos) {
  const bounds = this.checkBounds(pos);

  if(bounds === "x"){
    this.vel[0] *= -1;
  } else if (bounds === "y") {
    debugger;
    this.vel[1] *= -1;
  }
};

module.exports = MovingObject;
