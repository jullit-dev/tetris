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
    width: 400px;
    border: 3px solid #4B0082;
    font-size: 18px;
    padding: 50px;
    grid-column: 1 / 3;
    background-color: #d5d5ff;
    grid-row: 1 / 4;
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
    display: grid;
    grid-template-columns: repeat(3 1fr);
    grid-template-areas: 
    '. around .'
    'left . right'
    '. down .';
    border: 2px solid #4B0082;
    font-size: 30px;
    text-align: start;
    padding: 20px;
    grid-area: control;
    background-color: #d5d5ff;
  `;

  const aroundButton = document.createElement('button');
  const leftButton = document.createElement('button');
  const rightButton = document.createElement('button');
  const downButton = document.createElement('button');

  aroundButton.innerHTML = `
  <svg width="45" height="45" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="31" cy="31" r="31" fill="white"/>
    <path d="M43.3353 37.7057C43.6685 36.6526 43.0849 35.5288 42.0318 35.1956C40.9787 34.8624 39.8548 35.446 39.5216 36.4991L43.3353 37.7057ZM40.0772 48.0022L43.3353 37.7057L39.5216 36.4991L36.2636 46.7956L40.0772 48.0022Z" fill="#4B0082"/>
    <path d="M49.6444 48.023C50.7184 47.7649 51.3798 46.685 51.1216 45.611C50.8635 44.5371 49.7836 43.8757 48.7096 44.1338L49.6444 48.023ZM34.7677 51.5981L49.6444 48.023L48.7096 44.1338L33.833 47.7089L34.7677 51.5981Z" fill="#4B0082"/>
    <path d="M30.7003 49.3989C40.7519 49.3989 48.9006 41.2509 48.9006 31.1995C48.9006 21.1481 40.7519 13 30.7003 13C20.6486 13 12.5 21.1481 12.5 31.1995C12.5 41.2509 20.6486 49.3989 30.7003 49.3989Z" stroke="#4B0082" stroke-width="4"/>
    <line y1="-4" x2="22" y2="-4" transform="matrix(0.298958 -0.954266 0.954275 0.298931 33.5 55.9939)" stroke="white" stroke-width="8"/>
  </svg>
  `;
  leftButton.innerHTML = `
  <svg width="45" height="45" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="31" cy="31" r="31" transform="rotate(90 31 31)" fill="white"/>
    <path d="M31.3742 21.3894C32.4672 20.5458 32.6696 18.9757 31.8261 17.8826C30.9827 16.7894 29.4129 16.5871 28.3199 17.4307L31.3742 21.3894ZM15.0201 27.695L13.041 29.2225L16.0953 33.1812L18.0744 31.6537L15.0201 27.695ZM28.3199 17.4307L15.0201 27.695L18.0744 31.6537L31.3742 21.3894L28.3199 17.4307Z" fill="#4B0082"/>
    <path d="M18.2923 30.3504L16.3132 28.823L13.2589 32.7816L15.238 34.3091L18.2923 30.3504ZM28.5386 44.5742C29.6316 45.4178 31.2014 45.2155 32.0449 44.1223C32.8883 43.0292 32.686 41.4591 31.5929 40.6155L28.5386 44.5742ZM15.238 34.3091L28.5386 44.5742L31.5929 40.6155L18.2923 30.3504L15.238 34.3091Z" fill="#4B0082"/>
    <line x1="47.1" y1="30.9348" x2="14.9" y2="30.9348" stroke="#4B0082" stroke-width="5" stroke-linecap="round"/>
  </svg>
  `;
  rightButton.innerHTML = `
  <svg width="45" height="45" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="31" cy="31" r="31" transform="rotate(-90 31 31)" fill="white"/>
    <path d="M30.6258 40.6107C29.5328 41.4542 29.3304 43.0243 30.1739 44.1174C31.0173 45.2106 32.5871 45.4129 33.6801 44.5693L30.6258 40.6107ZM46.9799 34.305L48.959 32.7775L45.9047 28.8188L43.9256 30.3463L46.9799 34.305ZM33.6801 44.5693L46.9799 34.305L43.9256 30.3463L30.6258 40.6107L33.6801 44.5693Z" fill="#4B0082"/>
    <path d="M43.7077 31.6496L45.6868 33.177L48.7411 29.2184L46.762 27.6909L43.7077 31.6496ZM33.4614 17.4258C32.3684 16.5822 30.7986 16.7845 29.9551 17.8777C29.1117 18.9708 29.314 20.5409 30.4071 21.3845L33.4614 17.4258ZM46.762 27.6909L33.4614 17.4258L30.4071 21.3845L43.7077 31.6496L46.762 27.6909Z" fill="#4B0082"/>
    <line x1="14.9" y1="31.0652" x2="47.1" y2="31.0652" stroke="#4B0082" stroke-width="5" stroke-linecap="round"/>
  </svg>
  `;
  downButton.innerHTML = `
    <svg width="45" height="45" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="31" cy="31" r="31" fill="white"/>
      <path d="M21.3894 30.6258C20.5458 29.5328 18.9757 29.3304 17.8826 30.1739C16.7894 31.0173 16.5871 32.5871 17.4307 33.6801L21.3894 30.6258ZM27.695 46.9799L29.2225 48.959L33.1812 45.9047L31.6537 43.9256L27.695 46.9799ZM17.4307 33.6801L27.695 46.9799L31.6537 43.9256L21.3894 30.6258L17.4307 33.6801Z" fill="#4B0082"/>
      <path d="M30.3504 43.7077L28.823 45.6868L32.7817 48.7411L34.3091 46.762L30.3504 43.7077ZM44.5742 33.4614C45.4178 32.3684 45.2155 30.7986 44.1223 29.9551C43.0292 29.1117 41.4591 29.314 40.6155 30.4071L44.5742 33.4614ZM34.3091 46.762L44.5742 33.4614L40.6155 30.4071L30.3504 43.7077L34.3091 46.762Z" fill="#4B0082"/>
      <line x1="30.9348" y1="14.9" x2="30.9348" y2="47.1" stroke="#4B0082" stroke-width="5" stroke-linecap="round"/>
    </svg>
  `;

  aroundButton.id = 'around';
  leftButton.id = 'left';
  rightButton.id = 'right';
  downButton.id = 'down';

  aroundButton.style.cssText = `
    grid-area: around;
    border-radius: 50%;
    height: 45px;
    box-shadow: 0px 5px 10px 0px rgba(10, 0, 60, 0.5)
  `;
  leftButton.style.cssText = `
    grid-area: left;
    border-radius: 50%;
    height: 45px;
    box-shadow: 0px 5px 10px 0px rgba(10, 0, 60, 0.5)
  `;
  rightButton.style.cssText = `
    grid-area: right;
    border-radius: 50%;
    height: 45px;
    box-shadow: 0px 5px 10px 0px rgba(10, 0, 60, 0.5)
  `;
  downButton.style.cssText = `
    grid-area: down;
    border-radius: 50%;
    height: 45px;
    box-shadow: 0px 5px 10px 0px rgba(10, 0, 60, 0.5)
  `;

  controlBlock.append(aroundButton, leftButton, rightButton, downButton);
  this.container.append(controlBlock);
}

createBlockScore() {
  const scoreBlock = document.createElement('div');
  scoreBlock.style.cssText = `
    border: 2px solid #4B0082;
    font-size: 18px;
    text-align: start;
    padding: 20px;
    grid-area: score;
    background-color: #d5d5ff;
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
    border: 2px solid #4B0082;
    padding: 10px;
    grid-area: next;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d5d5ff;
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