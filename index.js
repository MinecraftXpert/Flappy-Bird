const titleContainer = document.querySelector(".placement");
const btn = document.querySelector("button");
const restartBtn = document.querySelector("#gameOverBtn");

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024; // 16:9
canvas.height = 576;

let y = 200;
let bottom = y + 50;

let changeCharacter = false;

function drawImageBackground() {
  const backgroundImage = new Image();
  backgroundImage.src = "./img/flappybird.png";

  backgroundImage.onload = () => {
    c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };
}

function drawCharacter() {
  const flappybird = new Image();
  flappybird.src = "./img/flappy bird guy.png";

  flappybird.onload = () => {
    c.drawImage(flappybird, 100, y, 50, 50);
  };
}

function drawNewFlappy() {
  const newFlappy = new Image();
  newFlappy.src = "./img/flappy bird.png";

  newFlappy.onload = () => {
    c.drawImage(newFlappy, 100, y, 50, 50);
  };
}

btn.addEventListener("click", () => {
  animate();
  // drawNewFlappy();
  titleContainer.classList.add("hide");
});

restartBtn.addEventListener("click", () => {
  titleContainer.classList.remove("hide");
  document.querySelector("#gameOver").style.display = "none";
  document.querySelector("#gameOverBtn").style.display = "none";

  y = 200;

  drawImageBackground();

  drawCharacter();
});

let velocity = 1;

drawImageBackground();

drawCharacter();

function animate() {
  const animationId = requestAnimationFrame(animate);

  const backgroundImage = new Image();
  backgroundImage.src = "./img/flappybird.png";

  backgroundImage.onload = () => {
    c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };

  drawCharacter();

  c.save();
  c.rotate(180*Math.PI/180);
  c.translate(canvas.width/2, canvas.height/2)
  drawNewFlappy();
  c.restore();

  y += velocity;
  bottom = y + 50;

  if (y < -5) {
    cancelAnimationFrame(animationId);
    document.querySelector("#gameOverBtn").style.display = "block";
    document.querySelector("#gameOver").style.display = "block";
  }

  // checks if the character is not touching the bottom of the canvas
  if (bottom + velocity < canvas.height + 15) {
    velocity += 0.2;
  } else {
    velocity = 0;
    cancelAnimationFrame(animationId);
    document.querySelector("#gameOver").style.display = "block";
    document.querySelector("#gameOverBtn").style.display = "block";
  }
}

canvas.addEventListener("click", () => {
  // console.log(velocity);
  if (y + velocity > 0) {
    // drawNewFlappy();
    velocity = -5;
  } else {
    velocity = 0;
  }
});

// animate();
