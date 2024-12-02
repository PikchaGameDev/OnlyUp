import { App } from "./app";

function runApp() {
  let app = new App();

  app.start();
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
