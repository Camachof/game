const Util = require("./util");
const MovingObject = require("./MovingObject.js");

const DEFAULTS = {
  COLOR: "#FF0000",
  RADIUS: 20,
  SPEED: 1
};

const Asteroid = function(options = {}){
  options.color= DEFAULTS.COLOR;
  options.radius = DEFAULTS.RADIUS;
  options.pos = options.pos;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
};

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
