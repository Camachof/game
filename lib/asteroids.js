const GameView = require("./gameView.js");
const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const ctx = canvas.getContext("2d");

  const game = new Game(canvas.height, canvas.width);
  new GameView(game, ctx).start(ctx, game);

  document.addEventListener("keydown", function(e){
    game.ship.keydown(e);
  });
});
