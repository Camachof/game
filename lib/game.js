const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");

const Game = function(){
  this.asteroids = [];
  this.ships = [];
  this.DIM_X = 1000;
  this.DIM_Y = 600;

  this.addAsteroids();
};

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 4;

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(
      {game: this}
    ));
  }
};

Game.prototype.allObjects = function () {
  return [].concat(this.asteroids);
};

Game.prototype.randomPosition = function () {
  return [
    Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()
  ];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  const all = this.allObjects();
  for (var i = 0; i < all.length; i++) {
    all[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach( (asteroid) => {
    asteroid.move();
  });
};

Game.prototype.checkCollisions = function () {
  const collided = [];

  for (var i = 0; i < this.asteroids.length; i++) {
    for (var j = i + 1; j < this.asteroids.length; j++) {
      if(this.asteroids[i].isCollidedWith(this.asteroids[j])){
        this.asteroids[i].collisionMerge(this.asteroids[j]);
      }
    }
  }
};

Game.prototype.remove = function (ball) {
  let toDelete;
  this.asteroids.forEach( (cell, index) => {
    if(ball.pos === cell.pos){
      toDelete = index;
    }
  });

  this.asteroids.splice(toDelete, 1);
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

module.exports = Game;
