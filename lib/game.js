const Asteroid = require("./asteroid.js");


const Game = function(ctx){
  this.asteroids = [];

  this.addAsteroids();
};

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(
      {pos: this.randomPosition()}
    ));
  }
};

Game.prototype.randomPosition = function () {
  return [
    Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()
  ];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  for (var i = 0; i < this.asteroids.length; i++) {
    this.asteroids[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach( (asteroid) => {
    asteroid.move();
  });
};

module.exports = Game;
