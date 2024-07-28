import { Game } from './modules/game.js';
import { View } from './modules/view.js';
import { Controller } from './modules/controller.js';

export const SIZE_BLOCK = 30;
export const COLUMNS = 10;
export const ROWS = 20;

const game = new Game();
const view = new View(document.querySelector('.container'));
const controller = new Controller(game, view);

const start = document.getElementById('start');
start.addEventListener('click', () => {
  controller.init();
});

window.addEventListener('keydown', (event) => {
  if ((event.code === 'Enter' || event.code === 'NumpadEnter') && (document.querySelector('.preview'))) {
    controller.init();
  };
  if ((event.code === 'Enter' || event.code === 'NumpadEnter') && (document.querySelector('.modal'))) {
    location.reload();
  };
});
