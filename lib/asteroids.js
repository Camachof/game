const GameView = require("./gameView.js");
const Game = require("./game.js");
let started = false;

document.addEventListener("DOMContentLoaded", function(){

  const canvas = document.getElementById("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const ctx = canvas.getContext("2d");

  let game = new Game(canvas.height, canvas.width);
  let gameView = new GameView(game, ctx);

  document.addEventListener("keydown", (e) => {
    if(e.keyCode === 13 && !started){
      debugger;
      let mouth = document.querySelector('.mouth');
      let text = document.querySelectorAll('.text');

      mouth.addEventListener('transitionend', () => {
        let intro = document.getElementById("intro_message");
        intro.className = "dissappear";
        canvas.className = "appear";
        gameView.start(ctx, game);
        started = true;
      }, false);
      mouth.classList.add("move");

      text.forEach( element => {
        element.classList.add("dissappear");
      });

    } else if (started) {
      game.ship.keydown(e);
    }

  });
});
