export class Controller {
  constructor (game, view) {
    this.game = game;
    this.view = view;
  }

  init() {
    this.view.init();
    this.start();
  }

  start() {
    this.view.showArea(this.game.viewArea);
    const showControl = this.view.createBlockControl();
    const showScore = this.view.createBlockScore();
    const showNextTetramino = this.view.createBlockNextTetromino();
    this.game.createUpdatePanels(showControl, showScore, showNextTetramino);

    const tick = () => {
      const time = (1100 - 100 * this.game.level);
      if (this.game.gameOver) return;
      setTimeout(() => {
        this.game.moveDown();
        this.view.showArea(this.game.viewArea);
        tick()
      }, time > 100 ? time : 100);
    };

    tick();

    const aroundButton = document.getElementById('around');
    aroundButton.addEventListener('click', () => {
      this.game.rotateTetromino();
      this.view.showArea(this.game.viewArea);
    });

    const leftButton = document.getElementById('left');
    leftButton.addEventListener('click', () => {
      this.game.moveLeft();
      this.view.showArea(this.game.viewArea);
    });

    const rightButton = document.getElementById('right');
    rightButton.addEventListener('click', () => {
      this.game.moveRight();
      this.view.showArea(this.game.viewArea);
    });

    const downButton = document.getElementById('down');
    downButton.addEventListener('click', () => {
      this.game.moveDown();
      this.view.showArea(this.game.viewArea);
    });

    window.addEventListener('keydown', (event) => {
      const key = event.code;
      switch (key) {
        case "ArrowLeft":
          leftButton.click();
          leftButton.style.transform = 'scale(0.7)';
        break;
        case "ArrowRight":
          rightButton.click();
          rightButton.style.transform = 'scale(0.7)';
        break;
        case "ArrowDown":
          downButton.click();
          downButton.style.transform = 'scale(0.7)';
        break;
        case "ArrowUp":
          aroundButton.click();
          aroundButton.style.transform = 'scale(0.7)';
        break;
      }
    });

    window.addEventListener('keyup', (event) => {
      const key = event.code;
      switch (key) {
        case "ArrowLeft":
          leftButton.style.transform = 'scale(1)';
        break;
        case "ArrowRight":
          rightButton.style.transform = 'scale(1)';
        break;
        case "ArrowDown":
          downButton.style.transform = 'scale(1)';
        break;
        case "ArrowUp":
          aroundButton.style.transform = 'scale(1)';
        break;
      }
    });
  }
};