
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
