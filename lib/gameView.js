
const GameView = function(game, ctx){
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  this.game.draw(this.ctx);
  this.game.step();
  let stop = requestAnimationFrame(this.start.bind(this));
  if(this.game.checkOver() === true){
    cancelAnimationFrame(stop);
    this.end();
  }
};

GameView.prototype.end = function () {
  $("#intro_message").removeClass("dissappear");
  $(".text").removeClass("dissappear");
  $(".mouth").removeClass("move");
  $("canvas").removeClass("appear");
};

module.exports = GameView;
