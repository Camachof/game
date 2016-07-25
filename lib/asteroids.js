const GameView = require("./gameView.js");
const Game = require("./game.js");
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
        intro.className = "dissappear";
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
