import { SIZE_BLOCK, COLUMNS, ROWS } from '../main.js';

export class View {
  constructor (container) {
    this.container = container;
    this.preview();
  }

  colors = {
    J: 'MediumTurquoise',
    I: 'MediumSlateBlue',
    O: 'LimeGreen',
    L: 'HotPink',
    2: 'MediumVioletRed',
    T: 'Indigo',
    S: 'Teal',
  } 

canvas = document.createElement('canvas');

preview() {
  this.container.textContent = '';
  const preview = document.createElement('div');
  preview.innerHTML = `
  <div class="preview__rules rules">
    <h2 class="rules__title preview__title">Правила игры</h2>
    <ul>
      <li class="rules__item">Перемещать и поворачивать падающие фигуры так, чтобы заполнять ими ряды</li>
      <li class="rules__item">Полностью заполнив один ряд, игрок получает 100 очков. Если сразу заполнено два ряда — 300 очков, три ряда — 700 очков, четыре ряда — 1500 очков</li>
      <li class="rules__item">После заполнения каждой десятой линии повышается уровень и скорость падения фигур</li>
    </ul>
  </div>
  <div class="preview__control control">
    <h2 class="control__title preview__title">Управление с помощью кнопок на экране или кнопок на клавиатуре</h2>
    <ul class="control__list">
      <li class="control__item"><span>&#8635; &nbsp; &nbsp; &#8593;</span> поворот фигуры на 90&deg;</li>
      <li class="control__item"><span>&#8594;</span> передвижение фигуры вправо</li>
      <li class="control__item"><span>&#8592;</span> перемещение фигуры влево</li>
      <li class="control__item"><span>&#8595;</span> ускорение движения фигуры вниз</li>
      <!-- <li class="control__item">Кнопка "Пауза" или "Пробел" на клавиатуре остановить/продолжить игру</li> -->
    </ul>
  </div>
  <div class="preview__start">Нажмите "ENTER", чтобы начать игру</div>
  `;
  preview.style.cssText = `
    border: 3px solid black;
    font-size: 18px;
    padding: 50px;
    grid-column: 1 / 3;
  `;
  preview.classList.add('preview');

  this.container.append(preview);
}

init() {
  this.container.textContent = '';
  this.canvas.style.gridArea = 'game';
  this.canvas.classList.add('game-area');
  this.container.append(this.canvas);
  this.canvas.width = SIZE_BLOCK * COLUMNS;
  this.canvas.height = SIZE_BLOCK * ROWS;
}

createBlockControl() {
  const controlBlock = document.createElement('div');
  controlBlock.style.cssText = `
    border: 2px solid black;
    font-size: 30px;
    text-align: start;
    padding: 20px;
    grid-area: control;
  `;

  const upButton = document.createElement('button');
  const leftButton = document.createElement('button');
  const rightButton = document.createElement('button');
  const downButton = document.createElement('button');

  upButton.innerHTML = '&#8635';
  leftButton.innerHTML = '&#8592';
  rightButton.innerHTML = '&#8594';
  downButton.innerHTML = '&#8595';

  upButton.id = 'up';
  leftButton.id = 'left';
  rightButton.id = 'right';
  downButton.id = 'down';

  controlBlock.append(upButton, leftButton, rightButton, downButton);
  this.container.append(controlBlock);
}

createBlockScore() {
  const scoreBlock = document.createElement('div');
  scoreBlock.style.cssText = `
    border: 2px solid black;
    font-size: 18px;
    text-align: start;
    padding: 20px;
    grid-area: score;
  `;

  const linesElem = document.createElement('p');
  const scoreElem = document.createElement('p');
  const levelElem = document.createElement('p');
  const recordElem = document.createElement('p');

  scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);
  this.container.append(scoreBlock);

  return (lines, score, level, record) => {
    linesElem.textContent = `линии: ${lines}`;
    scoreElem.textContent = `счет: ${score}`;
    levelElem.textContent = `уровень: ${level}`;
    recordElem.textContent = `рекорд: ${record}`;
  }
}

createBlockNextTetromino() {
  const tetrominoBlock = document.createElement('div');
  tetrominoBlock.style.cssText = `
    width: ${SIZE_BLOCK * 5}px;
    height: ${SIZE_BLOCK * 5}px;
    border: 2px solid black;
    padding: 10px;
    grid-area: next;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  tetrominoBlock.append(canvas);

  this.container.append(tetrominoBlock);

  return (tetromino) => {
    canvas.width = SIZE_BLOCK * tetromino.length;
    canvas.height = SIZE_BLOCK * tetromino.length;
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < tetromino.length; y++) {
      const line = tetromino[y];
  
      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== 'o') {
          context.fillStyle = this.colors[block];
          context.strokeStyle = 'white';
          context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
          context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
        }
      }
    }
  }
}

showArea(area) {
  const context = this.canvas.getContext('2d');

  context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  for (let y = 0; y < area.length; y++) {
    const line = area[y];

    for (let x = 0; x < line.length; x++) {
      const block = line[x];
      if (block !== 'o') {
        context.fillStyle = this.colors[block];
        context.strokeStyle = 'white';
        context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
        context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
      }
    }
  }
};
}