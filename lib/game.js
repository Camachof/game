const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");

const Game = function(){
  this.asteroids = [];
  this.ship = "";
  this.DIM_X = 1000;
  this.DIM_Y = 600;

  this.addAsteroids();
  this.addShip();
};

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 50;
Game.RADIUS = 30;

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(
      {game: this}
    ));
  }
};

Game.prototype.addShip = function () {
  this.ship = new Ship({
    game: this
  });
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat([this.ship]);
};

Game.prototype.randomPosition = function () {
  let x =  [
    (Math.random() * (Game.DIM_X - 50)) + 20, (Math.random() * (Game.DIM_Y - 50)) + 20
  ];
  return x;
};

Game.prototype.randomRadius = function () {
  return (Math.random() * (Game.RADIUS - 3)) + 3;
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  const all = this.allObjects();
  for (var i = 0; i < all.length; i++) {
    all[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function () {
  const all = this.allObjects();
  all.forEach( (objects) => {
    objects.move();
  });
};

Game.prototype.checkCollisions = function () {
  const all = this.allObjects();

  for (var i = 0; i < all.length; i++) {
    for (var j = i + 1; j < all.length; j++) {
      if(all[i].isCollidedWith(all[j])){
        if(all[j].constructor === Ship && all[i].radius >= all[j].radius){
          alert("game over");
        } else if (all[i].constructor === Ship && all[j].radius >= all[i].radius){
          alert("game over");
        } else {
          all[i].collisionMerge(all[j]);
        }
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
