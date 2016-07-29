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
	const started = true;
	
	document.addEventListener("DOMContentLoaded", function(){
	
	  const canvas = document.getElementById("canvas");
	  canvas.height = window.innerHeight;
	  canvas.width = window.innerWidth;
	  const ctx = canvas.getContext("2d");
	
	  let gameView = new GameView(canvas.width, canvas.height, ctx);
	
	  document.addEventListener("keydown", (e) => {
	    if(e.keyCode === 13 && !gameView.started){
	      let mouth = document.querySelector('.mouth');
	      let text = document.querySelectorAll('.text');
	
	      mouth.addEventListener('transitionend', () => {
	        let intro = document.getElementById("intro_message");
	        let introInstructions = document.getElementById("intro_instructions");
	
	        intro.className = "dissappear";
	        introInstructions.className = "dissappear";
	        canvas.className = "appear";
	
	        gameView.newGame();
	        gameView.start();
	
	      }, false);
	      mouth.classList.add("move");
	
	      text.forEach( element => {
	        element.classList.add("dissappear");
	      });
	
	    } else if (gameView.started) {
	      gameView.game.ship.keydown(e);
	    }
	
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);
	
	const GameView = function(width, height, ctx){
	  this.width = width;
	  this.height = height;
	  this.game = {};
	  this.ctx = ctx;
	  this.started = false;
	  this.toStop = "";
	
	  this.newGame();
	};
	
	GameView.prototype.newGame = function () {
	  this.game = new Game(this.height, this.width);
	};
	
	GameView.prototype.start = function () {
	  this.game.draw(this.ctx);
	  this.game.step();
	  this.toStop = requestAnimationFrame(this.start.bind(this));
	  this.started = true;
	  this.isOver();
	};
	
	GameView.prototype.isOver = function () {
	  if(this.game.checkOver() === true){
	    this.started = false;
	    cancelAnimationFrame(this.toStop);
	    this.end();
	  }
	};
	
	GameView.prototype.end = function () {
	  setTimeout( () => {
	    $("#intro_message").removeClass("dissappear");
	    $("#intro_instructions").removeClass("dissappear");
	    $("#intro_instructions").removeClass("intro_instructions");
	    $("#intro_instructions").addClass("intro_instructions");
	    $(".mouth").removeClass("move");
	    $("canvas").removeClass("appear");
	    $("#game_over").addClass("dissappear");
	    $("canvas").removeClass("fade_out");
	  }, 2000);
	  $("#game_over").removeClass("dissappear");
	  $("canvas").addClass("fade_out");
	};
	
	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);
	const Util = __webpack_require__(4);
	
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
	    this.over = false;
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	
	const DEFAULTS = {
	  COLOR: "#FF0000",
	  // RADIUS: 20,
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
	  },
	
	  isCollidedWith(object1, object2){
	    const sumRadii = object1.radius + object2.radius;
	    const xDiff = Math.pow(object1.pos[0] - object2.pos[0], 2);
	    const yDiff = Math.pow(object1.pos[1] - object2.pos[1], 2);
	    const Distance = Math.sqrt(xDiff + yDiff);
	
	    return Distance <= sumRadii;
	  }
	
	};
	
	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports) {

	const MovingObject = function(options){
	  this.ship =
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
	  this.ship = options.ship;
	};
	
	MovingObject.prototype.draw = function(ctx){
	
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	  ctx.arc(
	    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false
	  );
	  ctx.fill();
	
	  if(this.ship){
	    let img = new Image();
	
	    img.onload = function(){
	      ctx.drawImage(img, this.pos[0] - (this.radius), this.pos[1] - (this.radius), this.radius * 2, this.radius * 2);
	    }.bind(this);
	    img.src = "./mouth.png";
	    img.onload();
	  } else if (this.radius > 20) {
	    let img = new Image();
	
	    img.onload = function(){
	      ctx.drawImage(img, this.pos[0] - (this.radius), this.pos[1] - (this.radius), this.radius * 2, this.radius * 2);
	    }.bind(this);
	    img.src = "./patty.png";
	    img.onload();
	  }
	};
	
	MovingObject.prototype.move = function () {
	  this.applyBounds(this.pos);
	
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	
	};
	
	MovingObject.prototype.collisionMerge = function (otherCell) {
	
	  if (this.radius >= otherCell.radius){
	    this.radius += .5;
	    otherCell.radius -= 10;
	
	    this.vel[0] *= -1;
	    this.vel[1] *= -1;
	
	    otherCell.vel[0] *= -1;
	    otherCell.vel[1] *= -1;
	
	    if(otherCell.radius <= 1){
	      this.game.remove(otherCell);
	    }
	  } else {
	    this.radius -= 10;
	    otherCell.radius += .5;
	
	    if(this.radius <= 1){
	      this.game.remove(this);
	    }
	  }
	};
	
	MovingObject.prototype.checkBounds = function () {
	  if((this.pos[0] + this.vel[0] - this.radius) <= 0 ||
	    (this.pos[0] + this.vel[0]) >= (this.game.DIM_X - this.radius)){
	    return "x";
	  } else if ((this.pos[1] + this.vel[1] - this.radius) <= 0 ||
	    (this.pos[1] + this.vel[1]) >= (this.game.DIM_Y - this.radius)){
	    return "y";
	  }
	};
	
	MovingObject.prototype.applyBounds = function () {
	  const bounds = this.checkBounds();
	
	  if(bounds === "x"){
	    this.vel[0] /= 2;
	    this.vel[0] *= -1;
	  } else if (bounds === "y") {
	    this.vel[1] /= 2;
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
	};
	
	const Ship = function(options = {}){
	  options.color= DEFAULTS.COLOR;
	  options.radius = DEFAULTS.RADIUS;
	  options.pos = options.pos || options.game.randomPosition();
	  // maybe center it each time;
	  options.vel = [0,0];
	  options.ship = true;
	  // give it 0 speedp
	  MovingObject.call(this, options);
	};
	
	Util.inherits(Ship, MovingObject);
	
	Ship.prototype.keydown = function (e) {
	  if(e.keyCode === 39){
	    this.vel[0] += .5;
	    this.radius -= .05;
	  } else if (e.keyCode === 37) {
	    this.vel[0] -= .5;
	    this.radius -= .05;
	  } else if (e.keyCode === 38) {
	    this.radius -= .05;
	    this.vel[1] -= .5;
	  } else if (e.keyCode === 40) {
	    this.radius -= .05;
	    this.vel[1] += .5;
	  }
	};
	
	
	module.exports = Ship;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map