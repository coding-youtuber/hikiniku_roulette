const roulettes = document.querySelectorAll(".roulette");
const stopButtons = document.querySelectorAll(".stop-button");
const resetButton = document.getElementById("reset");

let intervalIds = [];

stopButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    clearInterval(intervalIds[index]);
    button.disabled = true;

    // サウンドを鳴らす部分を追加
    const imagePath = roulettes[index].querySelector(".image").src;
    const soundNumber = imagePath.match(/r(\d)\.jpg/)[1];
    const audio = new Audio(`sounds/r${soundNumber}.mp3`);
    audio.play();

    checkWin();
  });
});

resetButton.addEventListener("click", () => {
  // すべてのインターバルをクリアする
  intervalIds.forEach((intervalId) => clearInterval(intervalId));
  stopButtons.forEach((button) => (button.disabled = false));
  startRoulettes();
});

function startRoulettes() {
  roulettes.forEach((roulette, index) => {
    intervalIds[index] = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      const imagePath = `images/r${randomNumber}.jpg`;
      roulette.querySelector(".image").src = imagePath;
    }, 100);
  });
}

function checkWin() {
  const allStopped = Array.from(stopButtons).every((button) => button.disabled);
  if (allStopped) {
    const allR1 = Array.from(roulettes).every((roulette) =>
      roulette.querySelector(".image").src.includes("r2.jpg")
    );
    if (allR1) {
      alert("ゲームクリア！");
    }
  }
}

startRoulettes();
