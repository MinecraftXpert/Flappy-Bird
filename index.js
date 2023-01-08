// 
const titleContainer = document.querySelector(".placement");
const btn = document.querySelector("button");
const restartBtn = document.querySelector("#gameOverBtn");

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Creates the width and height of the canvas
canvas.width = 1024; // 16:9
canvas.height = 576;

// The y position of Flappy
let y = 200;
// Detects the bottom of Flappy
let bottom = y + 50;

// Changes the image from straight to either up or down
let changeCharacter = false;

// Draws the background image
function drawImageBackground() {
  // Creates a new image
  const backgroundImage = new Image();
  backgroundImage.src = "./img/flappybird.png";

  // Loads the image
  backgroundImage.onload = () => {
    c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };
}

// Draws Flappy
function drawCharacter() {
  const flappybird = new Image();
  flappybird.src = "./img/flappy bird guy.png";

  flappybird.onload = () => {
    c.drawImage(flappybird, 100, y, 50, 50);
  };
}

// Draws Flappy when he goes up
function drawNewFlappy() {
  const newFlappy = new Image();
  newFlappy.src = "./img/flappy bird.png";

  newFlappy.onload = () => {
    c.drawImage(newFlappy, 100, y, 50, 50);
  };
}

// When you click the button, it'll animate our game and hide the titleContainer class
btn.addEventListener("click", () => {
  // Calls the animate function which animates our game
  animate();
  // Adds the class of "titleContainer" which will get rid of the main menu by display: none
  titleContainer.classList.add("hide");
});

// When you click the restart button, it'll remove the hide class which adds the main menu text and start button, and then adds in the background image and Flaapy therefore making it look exactly like the main menu was
restartBtn.addEventListener("click", () => {
  // Removes the class of hide which hid the main menu
  titleContainer.classList.remove("hide");
  // Hides the gameover text
  document.querySelector("#gameOver").style.display = "none";
  // Hides the gameover restart button
  document.querySelector("#gameOverBtn").style.display = "none";

  // Sets the y coordinate of the flappy bird back to where it was on the main menu
  y = 200;

  // Draws the background
  drawImageBackground();

  // Draws Flappy
  drawCharacter();
});

// Creates the velocity which is either negative or positive
let velocity = 1;

// Draws the background image when it first loads
drawImageBackground();

// Draws Flappy
drawCharacter();

// Animates the game using a recursive technique
function animate() {
  // This determines whether the scene should be animating or not
  const animationId = requestAnimationFrame(animate);

  // Draws a new image
  const backgroundImage = new Image();
  backgroundImage.src = "./img/flappybird.png";

  // Loads in the image
  backgroundImage.onload = () => {
    c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };

  // Draws our character but now it's animating
  drawCharacter();

  // Ignore this
  c.save();
  c.rotate(180*Math.PI/180);
  c.translate(canvas.width/2, canvas.height/2)
  drawNewFlappy();
  c.restore();
  // Stop ignoring now lol

  // Adds the y position by the var velocity
  y += velocity;
  // Updates the bottom of the image so we can detect when the image collides with the bottom of canvas
  bottom = y + 50;

  // Detects when Flappy reaches the top of the canvas
  if (y < -5) {
    // Cancels the animatation
    cancelAnimationFrame(animationId);
    // Adds in the game over button and game over text
    document.querySelector("#gameOverBtn").style.display = "block";
    document.querySelector("#gameOver").style.display = "block";
  }

  // checks if the character is not touching the bottom of the canvas
  if (bottom + velocity < canvas.height + 15) {
    // Adds just enough velocity so it doesn't go crazy
    velocity += 0.2;
  } else {
    // If the character does go below the canvas, it will make the velocity 0 which will make the image stop
    velocity = 0;
    // Cancels any animation
    cancelAnimationFrame(animationId);
    // Displays the game over text and game over button
    document.querySelector("#gameOver").style.display = "block";
    document.querySelector("#gameOverBtn").style.display = "block";
  }
}

// Activates when clicking the canvas
canvas.addEventListener("click", () => {
  // If Flappy has a velocity + y position that's greater than 0
  if (y + velocity > 0) {
    // drawNewFlappy();
    // Makes Flappy go up a bit
    velocity = -5;
  } else {
    // Makes Flappy stay put
    velocity = 0;
  }
});

// animate();
