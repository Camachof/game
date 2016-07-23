const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");
const Util = require("./util.js");

const Game = function(height, width){
  this.asteroids = [];
  this.ship = "";
  this.DIM_X = width;
  this.DIM_Y = height;
  this.over = false;

  this.addShip();
  this.addAsteroids();
};

Game.BG_COLOR = "#000000";
Game.NUM_ASTEROIDS = 200;
Game.RADIUS = 40;

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

  if(this.ship !== ""){
    let tooClose = true;

    let x;
    while(tooClose){
      x =  [
        (Math.random() * (this.DIM_X - (Game.RADIUS * 2))) + Game.RADIUS, (Math.random() * (this.DIM_Y - (Game.RADIUS * 2))) + Game.RADIUS
      ];

      const sumRadii = this.ship.radius + 60;
      const xDiff = Math.pow(this.ship.pos[0] - x[0], 2);
      const yDiff = Math.pow(this.ship.pos[1] - x[1], 2);
      const Distance = Math.sqrt(xDiff + yDiff);

      tooClose = Distance <= sumRadii;
    }
    return x;

  } else {
    let x =  [
      (Math.random() * (this.DIM_X - (Game.RADIUS * 2))) + Game.RADIUS, (Math.random() * (this.DIM_Y - (Game.RADIUS * 2))) + Game.RADIUS
    ];
    return x;
  }

};

Game.prototype.randomRadius = function () {
  const rand = (Math.random() * (Game.RADIUS));

  if (rand >= 0 && rand < 3){
    return (Math.random() * 20) + 30;
  } else if (rand > 30 && rand <= 40) {
    return (Math.random() * 5) + 10;
  } else
    return (Math.random() * 4) + 1;
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
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
      if(Util.isCollidedWith(all[i],all[j])){
        if(all[j].constructor === Ship && all[i].radius >= all[j].radius){
          this.over = true;
        } else if (all[i].constructor === Ship && all[j].radius >= all[i].radius){
          this.over = true;
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

Game.prototype.checkOver = function () {
  if(this.allObjects().length === 1 || this.ship.raidus < .5){
    this.over = true;
  }
  return this.over;
};

module.exports = Game;
