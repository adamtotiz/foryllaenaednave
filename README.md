<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Farewell Yllaena</title>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(#2b0000, #4b0000);
  color: white;
  text-align: center;
  overflow-x: hidden;
}

/* INTRO SCREEN */
#intro {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #2b0000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  z-index: 9999;
  opacity: 1;
  transition: opacity 2s ease;
}

/* HEADER */
header {
  background-color: #8b0000;
  padding: 20px;
  font-size: 26px;
  font-weight: bold;
}

/* MUSIC BUTTON */
.music-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #8b0000;
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1000;
}

/* PETALS */
.petal {
  position: fixed;
  top: -10px;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, #ffc0cb 40%, #ff9eb5 100%);
  border-radius: 50% 50% 50% 0;
  transform: rotate(45deg);
  pointer-events: none;
  opacity: 0.8;
}

@keyframes fall {
  0% { transform: translateY(-10vh) translateX(0) rotate(0deg); }
  100% { transform: translateY(110vh) translateX(var(--drift)) rotate(360deg); }
}

/* UPLOAD */
.upload-container {
  margin: 20px;
  padding: 20px;
  border: 2px dashed white;
  border-radius: 10px;
  display: inline-block;
  cursor: pointer;
}

/* GALLERY */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  padding: 20px;
}

.image-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.image-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.image-card button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #8b0000;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
}

/* LETTERS */
.letters {
  padding: 20px;
}

.letter {
  background: white;
  color: #2b0000;
  margin: 15px auto;
  padding: 15px;
  border-radius: 10px;
  width: 90%;
  max-width: 320px;
  cursor: pointer;
  text-align: center;
}

.message {
  display: none;
  margin-top: 10px;
}
</style>
</head>

<body>

<!-- INTRO -->
<div id="intro">For Yllaena… 💔🌸</div>

<header>Farewell Yllaena 💔🌸</header>

<!-- MUSIC -->
<iframe id="musicFrame" width="0" height="0"
src="https://www.youtube.com/embed/XPpTgCho5ZA?enablejsapi=1&loop=1&playlist=XPpTgCho5ZA"
allow="autoplay">
</iframe>

<button class="music-btn" onclick="toggleMusic()">🔊 Music</button>

<!-- UPLOAD -->
<label class="upload-container">
  Upload Memories 📸
  <input type="file" id="imageInput" multiple accept="image/*">
</label>

<div class="gallery" id="gallery"></div>

<div class="letters" id="letters"></div>

<script>
/* INTRO FADE */
setTimeout(() => {
  document.getElementById("intro").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
  }, 2000);
}, 2000);

/* MUSIC CONTROL */
let playing = false;
function toggleMusic() {
  const iframe = document.getElementById("musicFrame");
  if (!playing) {
    iframe.src += "&autoplay=1";
    playing = true;
  } else {
    iframe.src = iframe.src.replace("&autoplay=1", "");
    playing = false;
  }
}

/* LETTERS */
const lettersData = [
"Farewell Yllaena, I hope Singapore brings you peace. We will miss you.",
"Yuna, Raven, Marlin, Camille, Lorraine, and Fatima will miss you.",
"10 Mabini will miss you.",
"And I, Adam, will miss you so much. I promise I’ll do my best and see you in Singapore.",
"Distance won’t change anything.",
"This isn't goodbye forever—just a new chapter."
];

const lettersContainer = document.getElementById("letters");

lettersData.forEach(text => {
  const letter = document.createElement("div");
  letter.className = "letter";
  letter.innerHTML = "Click 💌<div class='message'></div>";

  const msg = letter.querySelector(".message");

  letter.onclick = () => {
    msg.style.display = msg.style.display === "block" ? "none" : "block";
    typeText(msg, text);
  };

  lettersContainer.appendChild(letter);
});

/* TYPING */
function typeText(el, text) {
  el.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    el.innerHTML += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 30);
}

/* IMAGE UPLOAD */
const imageInput = document.getElementById("imageInput");
const gallery = document.getElementById("gallery");

imageInput.addEventListener("change", function() {
  for (let file of this.files) {
    if (!file.type.startsWith("image/")) continue;

    const reader = new FileReader();
    reader.onload = e => {
      const div = document.createElement("div");
      div.className = "image-card";
      div.innerHTML = `
        <img src="${e.target.result}">
        <button onclick="this.parentElement.remove()">X</button>
      `;
      gallery.appendChild(div);
    };
    reader.readAsDataURL(file);
  }
});

/* PETALS */
let petals = [];
let mouseX = window.innerWidth / 2;

document.addEventListener("mousemove", e => mouseX = e.clientX);

function createPetal() {
  const p = document.createElement("div");
  p.className = "petal";

  const x = Math.random() * window.innerWidth;
  const drift = (Math.random() - 0.5) * 200;

  p.style.left = x + "px";
  p.style.setProperty("--drift", drift + "px");

  const duration = 6 + Math.random() * 6;
  p.style.animation = `fall ${duration}s linear forwards`;

  document.body.appendChild(p);

  petals.push(p);

  setTimeout(() => {
    p.remove();
    petals = petals.filter(el => el !== p);
  }, duration * 1000);
}

function updatePetals() {
  petals.forEach(p => {
    const rect = p.getBoundingClientRect();
    const wind = Math.sin(Date.now()/1000) * 0.5;
    const influence = (mouseX - rect.left) * 0.0005;

    p.style.transform = `
      translateX(${wind * 20 + influence * 50}px)
      rotate(${rect.top}deg)
    `;
  });

  requestAnimationFrame(updatePetals);
}

setInterval(createPetal, 200);
updatePetals();
</script>

</body>
</html>
