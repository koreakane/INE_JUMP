//canvas setting

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const W_WIDTH = window.innerWidth;
const W_HEIGHT = window.innerHeight;

const Land_Y = (W_HEIGHT * 2) / 3;

canvas.width = W_WIDTH;
canvas.height = W_HEIGHT;

//game setting

const gravity = 0.32;

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
  x: 0,
  y: Land_Y - 120,
  width: 80,
  height: 120,
  draw() {
    ctx.fillStyle = "gray";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

let pigeonList = [];
let pigeonSpeed = 4;

class Pigeon {
  constructor() {
    this.x = W_WIDTH + 40;
    this.y = 300;
    this.width = 70;
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
  y: Land_Y,
  width: W_WIDTH,
  height: W_HEIGHT - Land_Y,
  draw() {
    ctx.fillStyle = "chocolate";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

//game UI setting

let scoreText = {
  x: W_WIDTH / 2 - 40,
  y: 100,
  width: 80,
  height: 40,
  draw() {
    ctx.font = "24px serif";
    ctx.fillText(`score : ${score}`, this.x, this.y);
  },
};

//main function

function frameAnimation() {
  animation = requestAnimationFrame(frameAnimation);
  timer++;
  score++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 288 === 0) {
    var pigeon = new Pigeon();
    pigeonList.push(pigeon);
  }

  pigeonList.forEach((v, i, a) => {
    if (v.x < -70) {
      a.splice(i, 1);
    }

    collideChecker(INE, v);

    v.x -= pigeonSpeed;
    v.draw();
  });

  if (isJumping) {
    gravitySpeed -= gravity;
    INE.y -= gravitySpeed;
    jumpTimer++;
  }
  if (INE.y >= Land_Y - INE.height) {
    isJumping = false;
    gravitySpeed = 0;
  }

  INE.draw();
  land.draw();
  scoreText.draw();
}

frameAnimation();

//sub function

function collideChecker(I, P) {
  const I_Rx = I.x + I.width;
  const I_By = I.y + I.height;
  const P_Rx = P.x + P.width;
  const P_By = P.y + P.height;

  if (
    (I_Rx >= P.x && I.x <= P.x && I_By >= P.y && I.y <= P.y) ||
    (I_Rx >= P_Rx && I.x <= P_Rx && I_By >= P.y && I.y <= P.y) ||
    (I_Rx >= P.x && I.x <= P.x && I_By >= P_By && I.y <= P_By) ||
    (I_Rx >= P_Rx && I.x <= P_Rx && I_By >= P_By && I.y <= P_By)
  ) {
    console.log(I, P);

    gameProcess = false;
    // alert("gg");
    cancelAnimationFrame(animation);
  }
}

//event listner

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    if (!gameProcess) {
      score = 0;
      gameProcess = true;
      pigeonList = [];
      frameAnimation();
    }

    if (!isJumping) {
      isJumping = true;
      gravitySpeed = 14;
    }
  }
});
