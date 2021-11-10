const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let dinoPosition = 0;
let isJumping = false;

function handleKeyDown(event) {
  if (event.keyCode === 32 && !isJumping) {
    jump();
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (dinoPosition >= 150) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (dinoPosition <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          dinoPosition -= 20;
          dino.style.bottom = dinoPosition + 'px';
        }
      }, 20);
    }
    dinoPosition += 20;
    dino.style.bottom = dinoPosition + 'px';
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = `<h1 class="game-over">GAME OVER</h1>`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);
  setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keydown', handleKeyDown);
