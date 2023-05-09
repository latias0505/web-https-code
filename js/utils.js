function hi() {
    // alert("Hi!!!!");
    console.log("Hi!!!!");
}

function sum(x, y) {
    let result = x + y;
    console.log(result);
}

function total(x, y) {
    return x + y;
}

function asknum() {
    let num = prompt("1에서 100사이의 숫자를 입력해주세요");
    checknum(num);
}

function checknum(num) {
    if(isNaN(num)) {
        alert("숫자만 입력해주세요");
        asknum();
    } else if(num > 100 || num < 1) {
        alert("1에서 100사이의 숫자만 입력해주세요");
        asknum();
    } else {
        for(let i = 1; i <= 100; i++) {
            console.log(i);
        }
        alert("완료되었습니다.");
    }
}