// import "core-js/stable";
// import "regenerator-runtime/runtime";
import {setupHome} from "./home";
import {setupSettings} from "./settings";
import {setupFeedback} from "./feedback";
import "../css/index.scss";

window.addEventListener('load', () => {
// document.addEventListener('readystatechange', () => {
//   if( document.readyState !== 'interactive' )
//     return;

  setupHome();
  setupSettings();
  setupFeedback();

// });
}, {once: true});



