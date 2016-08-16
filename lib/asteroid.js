const Util = require("./util");
const MovingObject = require("./MovingObject.js");

const DEFAULTS = {
  COLOR: "#FF0000",
  SPEED: .1,
};

const Asteroid = function(options = {}){
  options.color= DEFAULTS.COLOR;
  options.radius = options.radius || options.game.randomRadius();
  options.pos = options.pos || options.game.randomPosition();
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
};

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
