const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");

const Game = function(ctx){
  this.asteroids = [];
  this.ships = [];

  this.addAsteroids();
  this.addShip();
};

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(
      {game: this}
    ));
  }
};

Game.prototype.addShip = function () {
  const ship = new Ship();

  this.ships.push(ship);
};

Game.prototype.addAsteroid = function(size){
  this.addAsteroids.push(new Asteroid(
    {game: this, size: size}
  ));
};

Game.prototype.allObjects = function () {
  return [].concat(this.asteroids, this.ships);
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

Game.prototype.wrap = function (pos) {
  let x = pos[0];
  let y = pos[1];

  if(x > Game.DIM_X){
    x -= Game.DIM_X;
  } else if (y > Game.DIM_Y){
    y -= Game.DIM_Y;
  } else if (x < 0) {
    x = Game.DIM_X + x;
  } else if (y < 0){
    y = Game.DIM_Y + y;
  }
  return [x,y];
};

Game.prototype.checkCollisions = function () {
  for (var i = 0; i < this.asteroids.length; i++) {
    for (var j = i + 1; j < this.asteroids.length; j++) {
      if(this.asteroids[i].isCollidedWith(this.asteroids[j])){
        this.postCollision(this.asteroids[i], this.asteroids[j]);
      }
    }
  }
};

Game.prototype.postCollision = function () {
  
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

module.exports = Game;
