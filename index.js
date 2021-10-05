//canvas setting

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const W_WIDTH = window.innerWidth;
const W_HEIGHT = window.innerHeight;

canvas.width = W_WIDTH;
canvas.height = W_HEIGHT - 100;

//game setting

const gravity = 0.4;

let gravitySpeed = 0;
let isJumping = false;
let isFly = false;

let score = 0;
let gameProcess = true;

let timer = 0;
let jumpTimer = 0;
let animation;

//npc setting

let INE = {
  x: 50,
  y: 300,
  width: 30,
  height: 40,
  draw() {
    ctx.fillStyle = "gray";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

let pigeonList = [];

class Pigeon {
  constructor() {
    this.x = W_WIDTH + 40;
    this.y = 300;
    this.width = 20;
    this.height = 40;
  }
  draw() {
    ctx.fillStyle = "lightgray";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

//terrain setting

let land = {
  x: 0,
  y: 340,
  width: W_WIDTH,
  height: W_HEIGHT - 340,
  draw() {
    ctx.fillStyle = "chocolate";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

//main function

function frameAnimation() {
  animation = requestAnimationFrame(frameAnimation);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 90 === 0) {
    var pigeon = new Pigeon();
    pigeonList.push(pigeon);
  }

  pigeonList.forEach((v, i, a) => {
    if (v.x < 0) {
      a.splice(i, 1);
    }

    collideChecker(INE, v);

    v.x -= 5;
    v.draw();
  });

  if (isJumping) {
    gravitySpeed -= gravity;
    INE.y -= gravitySpeed;
    jumpTimer++;
  }
  if (INE.y >= 300) {
    isJumping = false;
    gravitySpeed = 0;
  }

  INE.draw();
  land.draw();
}

frameAnimation();

//sub function

function collideChecker(I, P) {
  const x_diff = P.x - (I.x + I.width);
  const y_diff = P.y - (I.y + I.height);
  if (x_diff < 0 && y_diff < 0) {
    console.log(I, P);
    console.log(x_diff, y_diff);
    gameProcess = false;
    // alert("gg");
    cancelAnimationFrame(animation);
  }
}

//event listner

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    isJumping = true;
    gravitySpeed = 10;
  }
});
