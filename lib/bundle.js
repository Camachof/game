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

	const GameView = __webpack_require__(3);
	const Game = __webpack_require__(4);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvas = document.getElementById("canvas");
	  canvas.width = Game.DIM_X;
	  canvas.height = Game.DIM_Y;
	  const ctx = canvas.getContext("2d");
	
	  const game = new Game(ctx);
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	const Util = {
	  inherits(childClass, parentClass) {
	    const Surrogate = function(){};
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
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
/* 2 */
/***/ function(module, exports) {

	
	
	const MovingObject = function(options){
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	};
	
	MovingObject.prototype.draw = function(ctx){
	  ctx.fillStyle = this.color;
	
	  ctx.beginPath();
	  ctx.arc(
	    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	  );
	  ctx.fill();
	};
	
	MovingObject.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	};
	
	module.exports = MovingObject;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	const GameView = function(game, ctx){
	  this.game = game;
	  this.ctx = ctx;
	};
	
	GameView.prototype.start = function () {
	  setInterval(() => {
	    this.game.draw(this.ctx);
	    this.game.moveObjects();
	  }, 20);
	};
	
	module.exports = GameView;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(5);
	
	
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(1);
	const MovingObject = __webpack_require__(2);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map