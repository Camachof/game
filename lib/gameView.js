const Game = require("./game.js");

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
