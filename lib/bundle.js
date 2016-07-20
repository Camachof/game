/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);
	const Game = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvas = document.getElementById("canvas");
	  canvas.width = Game.DIM_X;
	  canvas.height = Game.DIM_Y;
	  const ctx = canvas.getContext("2d");
	
	  const game = new Game();
	  new GameView(game, ctx).start();
	
	  document.addEventListener("keydown", function(e){
	    game.ship.keydown(e);
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	const GameView = function(game, ctx){
	  this.game = game;
	  this.ctx = ctx;
	};
	
	GameView.prototype.start = function () {
	  setInterval(() => {
	    this.game.draw(this.ctx);
	    this.game.step();
	  }, 20);
	};
	
	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	
	const DEFAULTS = {
	  COLOR: "#FF0000",
	  // RADIUS: 20,
	  SPEED: .2,
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	const Util = {
	  inherits(childClass, parentClass) {
	    const Surrogate = function(){};
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },
	
	  randomVec(length){
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	
	  scale(vec, m){
	    return [vec[0] * m, vec[0] * m];
	  }
	
	};
	
	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports) {

	
	const MovingObject = function(options){
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
	};
	
	MovingObject.prototype.draw = function(ctx){
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	  // if(this.pos[0] <= 20 || this.pos[0] >= this.game.DIM_X){
	  //   debugger;
	  // }
	  ctx.arc(
	    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	  );
	  ctx.fill();
	};
	
	MovingObject.prototype.move = function () {
	
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	
	  this.applyBounds(this.pos);
	};
	
	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  const sumRadii = this.radius + otherObject.radius;
	  const xDiff = Math.pow(this.pos[0] - otherObject.pos[0], 2);
	  const yDiff = Math.pow(this.pos[1] - otherObject.pos[1], 2);
	  const Distance = Math.sqrt(xDiff + yDiff);
	
	  return Distance <= sumRadii;
	};
	
	MovingObject.prototype.collisionMerge = function (otherCell) {
	
	  if (this.radius >= otherCell.radius){
	    this.radius += 1;
	    otherCell.radius -= 3;
	
	    this.vel[0] *= -1;
	    this.vel[1] *= -1;
	
	    otherCell.vel[0] *= -1;
	    otherCell.vel[1] *= -1;
	
	    if(otherCell.radius <= 1){
	      this.game.remove(otherCell);
	    }
	  } else {
	    this.radius -= 3;
	    otherCell.radius += 1;
	
	    if(this.radius <= 1){
	      this.game.remove(this);
	    }
	  }
	};
	
	MovingObject.prototype.checkBounds = function () {
	  if((this.pos[0] - this.radius) <= 0 || this.pos[0] >= (this.game.DIM_X - this.radius)){
	    return "x";
	  } else if ((this.pos[1] - this.radius) <= 0 || this.pos[1] >= (this.game.DIM_Y - this.radius)){
	    return "y";
	  }
	};
	
	MovingObject.prototype.applyBounds = function () {
	  const bounds = this.checkBounds();
	
	  if(bounds === "x"){
	    this.vel[0] *= -1;
	  } else if (bounds === "y") {
	    this.vel[1] *= -1;
	  }
	};
	
	module.exports = MovingObject;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map