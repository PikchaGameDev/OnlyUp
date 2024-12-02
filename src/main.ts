import { App } from "./app";
import { MAX_GAME_WIDTH } from "./constants";

function resizeApp() {
  const gameWidth =
    window.innerWidth > MAX_GAME_WIDTH ? MAX_GAME_WIDTH : window.innerWidth;
  let game_ratio = gameWidth / 2 / (window.innerHeight / 2);

  let div = document.getElementById("root");

  if (div) {
    div.style.height = window.innerHeight + "px";

    let canvas = document.getElementsByTagName("canvas")[0];

    let dpi_w = parseInt(div.style.width) / canvas.width;
    let dpi_h = parseInt(div.style.height) / canvas.height;

    let height = window.innerHeight * (dpi_w / dpi_h);
    let width = gameWidth * game_ratio;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
  }
}

function runApp() {
  let app = new App();

  app.start();

  window.addEventListener("resize", resizeApp);

  resizeApp();
}

window.onload = function () {
  try {
    eval("let i = 0;");
    eval("const _dev = true;");
  } catch (e) {
    alert("This browser is not supported. Use Chrome or Firefox");
    return false;
  }

  runApp();
};
