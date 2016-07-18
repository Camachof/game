const Util = require("./util");
const MovingObject = require("./MovingObject.js");

const DEFAULTS = {
  COLOR: "#FF0000",
  RADIUS: 20,
  SPEED: 1,
  SIZE: "big"
};

const Asteroid = function(options = {}){
  options.color= DEFAULTS.COLOR;
  options.size = options.size || DEFAULTS.SIZE;

  if(options.size === "big"){
    options.radius = DEFAULTS.RADIUS;
  } else if (options.size === "medium") {
    options.radius = DEFAULTS.RADIUS / 2;
  } else if (options.size === "small") {
    options.radius = DEFAULTS.RADIUS / 3;
  }
  
  options.pos = options.game.randomPosition();
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
};

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
