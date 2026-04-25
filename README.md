<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Farewell Yllaena</title>

<link href="https://fonts.cdnfonts.com/css/minecraftia" rel="stylesheet">

<style>
body {
  margin: 0;
  font-family: 'Minecraftia', monospace;
  background: linear-gradient(#2b0000, #4b0000);
  text-align: center;
  overflow-x: hidden;
}

/* 💗 GLOBAL TEXT */
body, header, #notif, .front, .back, .main-title {
  color: #ff8fb1;
  text-shadow:
    -1px -1px 0 #000,
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000;
}

/* 🎀 TITLE */
.main-title {
  font-size: 30px;
  margin-top: 20px;
}

/* 🎬 INTRO */
#intro {
  position: fixed;
  inset: 0;
  background: #1a0000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  z-index: 9999;
  animation: fadeOut 2s ease 5s forwards;
}

@keyframes fadeOut {
  to { opacity: 0; visibility: hidden; }
}

header {
  background: #8b0000;
  padding: 20px;
  font-size: 24px;
}

#notif {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.8);
  padding: 10px;
  border-radius: 10px;
  display: none;
}

/* 💌 LETTERS */
.letters { padding: 20px; }

.letter {
  width: 280px;
  margin: 15px auto;
  perspective: 1000px;
  cursor: pointer;
}

.big-letter {
  width: 320px;
}

.letter-inner {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.9s;
}

.front, .back {
  position: absolute;
  width: 100%;
  height: 180px;
  border-radius: 12px;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.big-letter .back {
  height: 260px;
  font-size: 11px;
}

.front {
  background: rgba(255,255,255,0.9);
  color: #2b0000;
}

.back {
  background: white;
  color: #2b0000;
  transform: rotateY(180deg);
}

.letter.open .letter-inner {
  transform: rotateY(180deg);
  box-shadow: 0 0 20px rgba(255,192,203,0.5);
}

/* 🌸 PETALS */
.petal {
  position: fixed;
  width: 10px;
  height: 10px;
  background: pink;
  border-radius: 50% 50% 50% 0;
  opacity: 0.7;
}

@keyframes fall {
  0% { transform: translateY(-10vh); }
  100% { transform: translateY(110vh); }
}
</style>
</head>

<body>

<div id="intro">For Yllaena… 🌸</div>

<h1 class="main-title">For Yllaena Reis Bustilla Ednave 💗</h1>
<header>Farewell Yllaena 🌸</header>

<!-- 🎵 MUSIC -->
<audio id="music" loop>
  <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b1a4b6f7.mp3?filename=sad-piano-ambient-110997.mp3">
</audio>

<audio id="notifSound">
  <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_4c3fef2c1a.mp3?filename=notification-112.wav">
</audio>

<audio id="openSound">
  <source src="https://cdn.pixabay.com/download/audio/2022/02/23/audio_9c0d91a9f2.mp3?filename=paper-flip-102349.mp3">
</audio>

<div class="letters" id="letters"></div>

<script>
let started = false;

document.body.addEventListener("click", () => {
  if (started) return;
  started = true;
  const m = document.getElementById("music");
  m.volume = 0;
  m.play();

  let v = 0;
  const fade = setInterval(() => {
    if (v < 1) {
      v += 0.03;
      m.volume = v;
    } else clearInterval(fade);
  }, 120);
}, { once: true });

function openSound() {
  document.getElementById("openSound").play();
}

/* 💌 LETTERS */
const data = [
"Farewell Yllaena, I hope Singapore brings you peace.",
"Goodluck sa Singapore, Yllaena. Kaya mo yan.",
"Kahit malayo ka na, you’ll always be remembered here.",
"10 Mabini will miss you.",
"And I will miss you the most… see you again ",
"Kahit nasa Singapore ka na, nandito lang kami.",
"Take care palagi, huwag mo kami kalimutan.",
"This isn't goodbye forever."
];

const container = document.getElementById("letters");

data.forEach(t => {
  const l = document.createElement("div");
  l.className = "letter";

  l.innerHTML = `
    <div class="letter-inner">
      <div class="front">💌 OPEN</div>
      <div class="back">${t}</div>
    </div>
  `;

  l.onclick = () => {
    l.classList.toggle("open");
    openSound();
  };

  container.appendChild(l);
});

/*  BIG FINAL LETTER */
const big = document.createElement("div");
big.className = "letter big-letter";

big.innerHTML = `
<div class="letter-inner">
  <div class="front"> ONE LAST LETTER</div>
  <div class="back">
  yllaena i know you're scared about what the future has satin, but i pinky promise you, i will always be there for you, tho baka we wont be able to talk everyday by then since your parents, i will still love u always, if ever we end, i hope we find eachother again when the time is right!! i pinky promise u i am only proudly devoted to you yllaena, only you.
  </div>
</div>
`;

big.onclick = () => {
  big.classList.toggle("open");
  openSound();
};

container.appendChild(big);

/* 🌸 PETALS */
function petals() {
  const p = document.createElement("div");
  p.className = "petal";
  p.style.left = Math.random()*window.innerWidth + "px";
  p.style.animation = `fall ${5+Math.random()*5}s linear`;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 9000);
}
setInterval(petals, 300);
</script>

</body>
</html>
