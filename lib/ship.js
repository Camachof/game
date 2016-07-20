const Util = require("./util");
const MovingObject = require("./MovingObject.js");

const DEFAULTS = {
  COLOR: "#000000",
  RADIUS: 20,
  SPEED: 1,
};

const Ship = function(options = {}){
  options.color= DEFAULTS.COLOR;
  options.radius = DEFAULTS.RADIUS;
  options.pos = options.pos || options.game.randomPosition();
  // maybe center it each time;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
  // give it 0 speedp
  MovingObject.call(this, options);
};

Util.inherits(Ship, MovingObject);

Ship.prototype.keydown = function (e) {
  if(e.keyCode === 39){
    this.vel[0] += .5;
  } else if (e.keyCode === 37) {
    this.vel[0] -= .5;
  } else if (e.keyCode === 38) {
    this.vel[1] += .5;
  } else if (e.keyCode === 40) {
    this.vel[1] -= .5;
  }
};


module.exports = Ship;
