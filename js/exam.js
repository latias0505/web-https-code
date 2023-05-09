//2번 과제 js
function asknum() {
  let num = prompt("1에서 100사이의 숫자를 입력해주세요");
  checknum(num);
}

function checknum(num) {
  if (isNaN(num)) {
    alert("숫자만 입력해주세요.");
    asknum();
  } else if (num > 100 || num < 1) {
    alert("1에서 100사이의 숫자만 입력해주세요");
    asknum();
  } else {
    for (let i = 1; i <= 100; i++) {
      console.log(i);
    }
    alert("완료되었습니다.");
  }
}

//3번 과제 js
function asktext() {
  let text = prompt("텍스트를 입력해주세요.");
  bigtext(text);
}

function bigtext(text) {
  if (text === null || text.trim() == "") {
    alert("텍스트 값을 입력해 주세요.");
    asktext();
  } else {
    let largetext = document.createElement("div");
    largetext.textContent = text;
    largetext.classList.add("big-text");
    document.body.appendChild(largetext);
  }
}

//4번 과제 js
let BoxName1 = null;

function changeBoxColor(boxId) {
  let box = document.getElementById(boxId);
  if (box !== BoxName1 && BoxName1 !== null) {
    BoxName1.style.backgroundColor = "";
    BoxName1.style.color = "";
    BoxName1.style.borderColor = "";
  }
  box.style.backgroundColor = "#ffffff";
  box.style.color = "#000000";
  box.style.borderColor = "#000000";
  BoxName1 = box;
}

//5번 과제 js
let BoxName2 = null;

function changeBoxColor(boxId) {
  let box = document.getElementById(boxId);
  if (box !== BoxName2 && BoxName2 !== null) {
    BoxName2.style.backgroundColor = "";
    BoxName2.style.color = "";
    BoxName2.style.borderColor = "";
  }
  box.style.backgroundColor = "#ffffff";
  box.style.color = "#000000";
  box.style.borderColor = "#000000";
  BoxName2 = box;
}
