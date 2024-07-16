export class Controller {
  constructor (game, view) {
    this.game = game;
    this.view = view;
  }

  init(codeKey) {
    window.addEventListener('keydown', event => {
      if (event.code === codeKey) {
        this.view.init();
        this.start();
      }
    })
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

    window.addEventListener('keydown', (event) => {
      const key = event.code;
      switch (key) {
        case "ArrowLeft":
          this.game.moveLeft();
          this.view.showArea(this.game.viewArea);
        break;
        case "ArrowRight":
          this.game.moveRight();
          this.view.showArea(this.game.viewArea);
        break;
        case "ArrowDown":
          this.game.moveDown();
          this.view.showArea(this.game.viewArea);
        break;
        case "ArrowUp":
          this.game.rotateTetromino();
          this.view.showArea(this.game.viewArea);
        break;
      }
    });

    const upButton = document.getElementById('up');
    upButton.addEventListener('click', () => {
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
  }
};