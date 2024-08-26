const title = document.getElementById("level-title");
const btns = document.querySelectorAll('.btn');
const startBtn = document.getElementById('start');
const box = document.querySelector('.row');

const colors = ['green', 'red', 'yellow', 'blue'];
let level = 0;
let userColorsChoice = [];
let gameColorsChoice = [];
let started = false;

startBtn.addEventListener("click", startGame);
document.body.addEventListener('keydown', startGame);

window.addEventListener('load', () => {
  box.classList.add('animate')
  btns.forEach(btn => {
    if (btn.classList.contains('btn-start')) return;
    btn.classList.add(`animate-${btn.id}`)
  })
})

function startGame() {
  box.classList.remove('animate');
  btns.forEach(btn => {
    btn.classList.remove(`animate-${btn.id}`)
  })
  let timeStart = 3;
  timer(timeStart);
  startBtn.classList.add('disable-btn')
  startBtn.innerText = "Start game";
  if (!started) {
    setTimeout(() => {
      title.style.transform = 'scale(1)';
      title.innerText = `Level ${level}`
      runGame();
      started = true;
      startBtn.innerText = "Restart game";
    }, 5500)
  }
}

btns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (btn.classList.contains('btn-start') || started === false) { return; }
    let userColor = this.id;
    soundPlay(userColor);
    userColorsChoice.push(userColor);
    document.getElementById(`${userColor}`).classList.add('clicked');
    setTimeout(() => {
      document.getElementById(`${userColor}`).classList.remove('clicked');
    }, 100);
    soundPlay(userColor);
    checkUserColorsChoice(userColorsChoice.length - 1)
  })
})

function runGame() {
  userColorsChoice = [];
  level++;
  if (level > 10) {
    win();
  } else {
    title.innerText = `Level ${level}`
    const random = randomButton();
    const randomColor = colors[random];
    soundPlay(randomColor)
    gameColorsChoice.push(randomColor);
    document.getElementById(`${randomColor}`).classList.add('clicked');
    setTimeout(() => {
      document.getElementById(`${randomColor}`).classList.remove('clicked');
    }, 100);
  }

}

function checkUserColorsChoice(current) {
  if (started === false) { return };
  if (userColorsChoice[current] === gameColorsChoice[current]) {
    if (userColorsChoice.length === gameColorsChoice.length) {
      setTimeout(() => {
        runGame();
      }, (level / 2) * 1000)
    }
  } else {
    gameOver();
  }
}

function restart() {
  level = 0;
  userColorsChoice = [];
  gameColorsChoice = [];
  started = false;
}
function gameOver() {
  soundPlay('wrong');
  document.body.classList.add('game-over');
  setTimeout(() => {
    document.body.classList.remove('game-over');
  }, 200);
  title.innerText = `Game over`;
  setTimeout(() => {
    message("To restart game, click any key on keyboard or button");
    startBtn.innerText = "Restart game"
    startBtn.classList.remove('disable-btn')
  }, 3000)
  restart();
}
function win() {
  message("You are winner !!! 🎉🎉🎉");
  const paragraph = document.createElement('p');
  paragraph.textContent = 'You have an Amazing Memory!';
  paragraph.id = 'text';
  document.querySelector('.header').append(paragraph);
  started = false;
  box.animate([
    { transform: "rotate(0)", gap: '0' },
    { transform: "rotate(360deg)", gap: '25px' },
  ], { duration: 1500, iterations: 3 })
  setTimeout(() => {
    message("To restart game, click any key on keyboard or button");
    startBtn.innerText = "Start game";
    startBtn.classList.remove('disable-btn');
    const el = document.getElementById('text');
    el.remove();
  }, 5000);
  restart();
}
function timer(num) {
  let sec = num;
  const time = 1500;
  const timeDuration = num * time;
  message('Start')
  let timerSet = setInterval(() => {
    title.style.transform = 'scale(2)';
    title.innerText = `${sec--}`
  }, time)
  setTimeout(() => {
    clearInterval(timerSet)
  }, timeDuration)
}
function randomButton() {
  const random = Math.floor(Math.random() * colors.length);
  return random;
}
function message(msg) {
  title.innerText = `${msg}`
}
function soundPlay(color) {
  const sound = new Audio(`sounds/${color}.mp3`);
  sound.play();
}
