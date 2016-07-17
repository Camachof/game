const GameView = require("./gameView.js");
const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;
  const ctx = canvas.getContext("2d");

  const game = new Game(ctx);
  new GameView(game, ctx).start();
});
