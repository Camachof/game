/*
  The Hilbert Curve: https://en.wikipedia.org/wiki/Hilbert_curve

  This Pen is the recursive version.
  Here is the L-system version:
  http://codepen.io/DonKarlssonSan/pen/XbevMj
*/

(function () {
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var min = Math.min(canvas.width, canvas.height);
  var ctx = canvas.getContext("2d");

  // Try changing this! Keep it under 10!
  var iterations = 8;
  var stepLength = 11 - iterations;
  var x,y;
  var colorAngle = 0;

  function drawStep(direction) {
    ctx.strokeStyle = "hsl(" + colorAngle + ", 100%, 50%)";
    colorAngle = (colorAngle + 0.007) % 360;
    ctx.beginPath();
    ctx.moveTo(x, y);
    switch (direction) {
      case 0:
        x += stepLength;
        break;
      case 1:
        y -= stepLength;
        break;
      case 2:
        x -= stepLength;
        break;
      case 3:
        y += stepLength;
        break;
      default:
        console.log("Invalid Direction: " + direction);
        break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function setDirection(direction) {
    if(direction === -1) {
      return 3;
    } if(direction === 4) {
      return 0;
    } else {
      return direction;
    }
  }

  function hilbert(direction, rotation, iteration) {
    if (iteration === 0) {
      return;
    }

    direction = setDirection(direction + rotation);
    hilbert(direction, -rotation, iteration - 1);
    drawStep(direction);
    direction = setDirection(direction - rotation);
    hilbert(direction, rotation, iteration - 1);
    drawStep(direction);
    hilbert(direction, rotation, iteration - 1);
    direction = setDirection(direction - rotation);
    drawStep(direction);
    hilbert(direction, -rotation, iteration - 1);
  }

  x = 0;
  y = canvas.height;
  hilbert(0, 1, iterations);
})();
