import BLOCKS from "./blocks.js";

//테트리스 게임판 만들기
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const linesDisplay = document.querySelector(".lines");
const levelDisplay = document.querySelector(".levels");
const restartButton = document.querySelector(".game-text > button");

//setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variables
// 테트리스 기본 점수
let score = 0;
let lines = 0;
let levels = "v.easy";

// 블럭이 떨어지는 시간
let duration = 500;

let downInterval;

// 실질적으로 무빙을 실행하기 전에 담아두는 용도
let tempMovingItem;

// 실질적으로 다음 블럭의 타입과 좌표 등 정보를 가지고 있는 변수
const MovingItem = {
  type: "",

  // 화살표 위쪽을 눌렀을때 좌우로 회전시키는 역활을 도와주는 지표
  direction: 3,

  // 좌표를 기준으로 어디까지 내려왔는지 얼마나 더 내려가야하는지 알 수 있게 도와줌
  top: 0,
  // 바로 위에 있는 top과 비슷하게 좌우 값을 알 수 있게 도와줌
  left: 0,
};

init();

// functions
function init() {
  tempMovingItem = { ...MovingItem };
  //세로로 20줄을 만들기 위한 for문
  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
  generateNewBlock();
}

function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  //가로로 10칸을 만들기 위한 for문
  for (let j = 0; j < GAME_COLS; j++) {
    const metrix = document.createElement("li");
    ul.prepend(metrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}

function renderBlocks(moveType = "") {
  const { type, direction, top, left } = tempMovingItem;
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove(type, "moving");
  });
  BLOCKS[type][direction].some((block) => {
    // 블록의 위치를 조정하는 코드
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null;
    const isAvailable = checkEmpty(target);
    if (isAvailable) {
      target.classList.add(type, "moving");
    } else {
      tempMovingItem = { ...MovingItem };
      if (moveType === "retry") {
        clearInterval(downInterval);
        showGameoverText();
      }
      setTimeout(() => {
        renderBlocks("retry");
        if (moveType === "top") {
          seizeBlock();
        }
      }, 0);
      return true;
    }
  });
  MovingItem.left = left;
  MovingItem.top = top;
  MovingItem.direction = direction;
}
function seizeBlock() {
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove("moving");
    moving.classList.add("seized");
  });
  checkMatch();
}
function checkMatch() {
  const childNodes = playground.childNodes;
  childNodes.forEach((child) => {
    let matched = true;
    child.children[0].childNodes.forEach((li) => {
      if (!li.classList.contains("seized")) {
        matched = false;
      }
    });
    if (matched) {
      child.remove();
      prependNewLine();
      score += 100;
      lines += 1;
      linesDisplay.innerText = lines;
      scoreDisplay.innerText = score;
    }
  });

  generateNewBlock();
}

function generateNewBlock() {
  clearInterval(downInterval);
  levelDisplay.innerText = levels;
  if (score >= 2000) {
    duration = 400;
    levels = "Easy";
  }
  if (score >= 4000) {
    duration = 300;
  }
  if (score >= 6000) {
    duration = 200;
  }
  if (score >= 8000) {
    duration = 100;
  }
  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, duration);

  const blockArray = Object.entries(BLOCKS);
  const randomIndex = Math.floor(Math.random() * blockArray.length);
  MovingItem.type = blockArray[randomIndex][0];
  MovingItem.top = 0;
  MovingItem.left = 3;
  MovingItem.direction = 0;
  tempMovingItem = { ...MovingItem };
  renderBlocks();
}

function checkEmpty(target) {
  if (!target || target.classList.contains("seized")) {
    return false;
  }
  return true;
}
function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}
function changeDirection() {
  const direction = tempMovingItem.direction;
  direction === 3
    ? (tempMovingItem.direction = 0)
    : (tempMovingItem.direction += 1);
  renderBlocks();
}

function dropBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, 10);
}
function showGameoverText() {
  gameText.style.display = "flex";
}

// event handling
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      moveBlock("left", 1);
      break;
    case "ArrowLeft":
      moveBlock("left", -1);
      break;
    case "ArrowDown":
      moveBlock("top", 1);
      break;
    case "ArrowUp":
      changeDirection();
      break;
    case " ":
      dropBlock();
      break;
    default:
      break;
  }
});

restartButton.addEventListener("click", () => {
  playground.innerHTML = "";
  score = 0;
  lines = 0;
  scoreDisplay.innerText = score;
  linesDisplay.innerText = lines;
  gameText.style.display = "none";
  init();
});
