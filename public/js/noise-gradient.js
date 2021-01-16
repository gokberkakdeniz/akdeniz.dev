function setup() {
  var canvas = createCanvas(300, 300);
  canvas.parent("sketch-holder");
  noLoop();
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw() {
  const dominantColor = document.getElementById("dominant_color").value;
  const rangeStart = Number.parseInt(document.getElementById("range_start").value);
  const rangeEnd = Number.parseInt(document.getElementById("range_end").value);

  if (Number.isNaN(rangeStart) || Number.isNaN(rangeEnd)) return;
  if ((rangeStart > 255 || rangeStart < 0) || (rangeEnd > 255 || rangeEnd < 0)) return;
  if (rangeStart > rangeEnd) return;

  for (let x = 0; x < 300; x++) {
    for (let y = 0; y < 300; y++) {
      let r, g, b;
      if (y < 5 || y > 295 || x < 5 || x > 295) {
        if (dominantColor === "r") {
          r = randomInt(rangeStart, rangeEnd);
          g = Math.round((255 - y * 255 / 300) / 2);
          b = Math.round((255 - x * 255 / 300) / 2);
        } else if (dominantColor === "g") {
          r = Math.round((255 - y * 255 / 300) / 2);
          g = randomInt(rangeStart, rangeEnd);
          b = Math.round((255 - x * 255 / 300) / 2);
        } else {
          r = Math.round((255 - y * 255 / 300) / 2);
          g = Math.round((255 - x * 255 / 300) / 2);
          b = randomInt(rangeStart, rangeEnd);
        }
      } else {
        if (dominantColor === "r") {
          r = randomInt(rangeStart, rangeEnd);
          g = randomInt(0, Math.round(255 - x * 255 / 300));
          b = randomInt(0, Math.round(255 - y * 255 / 300));
        } else if (dominantColor === "g") {
          r = randomInt(0, Math.round(255 - x * 255 / 300));
          g = randomInt(rangeStart, rangeEnd);
          b = randomInt(0, Math.round(255 - y * 255 / 300));
        } else {
          r = randomInt(0, Math.round(255 - x * 255 / 300));
          g = randomInt(0, Math.round(255 - y * 255 / 300));
          b = randomInt(rangeStart, rangeEnd);
        }
      }

      stroke(color(r, g, b));
      point(x, y);
    }
  }
}