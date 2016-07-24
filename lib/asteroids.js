const GameView = require("./gameView.js");
const Game = require("./game.js");
let started = false;

document.addEventListener("DOMContentLoaded", function(){

  const canvas = document.getElementById("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const ctx = canvas.getContext("2d");

  // let intro = document.getElementById("intro_message");
  let board = document.getElementById("canvas");

  let game = new Game(canvas.height, canvas.width);
  let gameView = new GameView(game, ctx);

  document.addEventListener("keydown", (e) => {

    if(e.keyCode === 13 && !started){

      let intro = document.querySelector('.intro_message');
      intro.addEventListener('transitionend', () => {
        debugger;
        canvas.className = "appear";
        gameView.start(ctx, game);
        started = true;
      }, false);
      intro.classList.add("move");
    } else if (started) {
      game.ship.keydown(e);
    }

  });
});
