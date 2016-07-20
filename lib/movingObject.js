
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
  // if(this.pos[0] <= 20 || this.pos[0] >= this.game.DIM_X){
  //   debugger;
  // }
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

  return Distance <= sumRadii;
};

MovingObject.prototype.collisionMerge = function (otherCell) {

  if (this.radius >= otherCell.radius){
    this.radius += 1;
    otherCell.radius -= 3;

    this.vel[0] *= -1;
    this.vel[1] *= -1;

    otherCell.vel[0] *= -1;
    otherCell.vel[1] *= -1;

    if(otherCell.radius <= 1){
      this.game.remove(otherCell);
    }
  } else {
    this.radius -= 3;
    otherCell.radius += 1;

    if(this.radius <= 1){
      this.game.remove(this);
    }
  }
};

MovingObject.prototype.checkBounds = function () {
  if((this.pos[0] - this.radius) <= 0 || this.pos[0] >= (this.game.DIM_X - this.radius)){
    return "x";
  } else if ((this.pos[1] - this.radius) <= 0 || this.pos[1] >= (this.game.DIM_Y - this.radius)){
    return "y";
  }
};

MovingObject.prototype.applyBounds = function () {
  const bounds = this.checkBounds();

  if(bounds === "x"){
    this.vel[0] *= -1;
  } else if (bounds === "y") {
    this.vel[1] *= -1;
  }
};

module.exports = MovingObject;
