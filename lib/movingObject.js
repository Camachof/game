const MovingObject = function(options){
  this.ship =
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
  this.ship = options.ship;
};

MovingObject.prototype.draw = function(ctx){

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false
  );
  ctx.fill();

  if(this.ship){
    let img = new Image();

    img.onload = function(){
      ctx.drawImage(img, this.pos[0] - (this.radius / 2), this.pos[1] - (this.radius / 2), this.radius, this.radius);
    }.bind(this);
    img.src = "./mouth.png";
    img.onload();
  }
};

MovingObject.prototype.move = function () {
  this.applyBounds(this.pos);

  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];

};

MovingObject.prototype.collisionMerge = function (otherCell) {

  if (this.radius >= otherCell.radius){
    this.radius += .5;
    otherCell.radius -= 10;

    this.vel[0] *= -1;
    this.vel[1] *= -1;

    otherCell.vel[0] *= -1;
    otherCell.vel[1] *= -1;

    if(otherCell.radius <= 1){
      this.game.remove(otherCell);
    }
  } else {
    this.radius -= 10;
    otherCell.radius += .5;

    if(this.radius <= 1){
      this.game.remove(this);
    }
  }
};

MovingObject.prototype.checkBounds = function () {
  if((this.pos[0] + this.vel[0] - this.radius) <= 0 ||
    (this.pos[0] + this.vel[0]) >= (this.game.DIM_X - this.radius)){
    return "x";
  } else if ((this.pos[1] + this.vel[1] - this.radius) <= 0 ||
    (this.pos[1] + this.vel[1]) >= (this.game.DIM_Y - this.radius)){
    return "y";
  }
};

MovingObject.prototype.applyBounds = function () {
  const bounds = this.checkBounds();

  if(bounds === "x"){
    this.vel[0] /= 2;
    this.vel[0] *= -1;
  } else if (bounds === "y") {
    this.vel[1] /= 2;
    this.vel[1] *= -1;
  }
};

module.exports = MovingObject;
