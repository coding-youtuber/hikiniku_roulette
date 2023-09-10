// HTMLからルーレットの要素をすべて取得
const roulettes = document.querySelectorAll(".roulette");

// HTMLから停止ボタンの要素をすべて取得
const stopButtons = document.querySelectorAll(".stop-button");

// リセットボタンの要素を取得
const resetButton = document.getElementById("reset");

// ルーレットが回転している状態を管理するためのインターバルIDを格納する配列
let intervalIds = [];

// すべての停止ボタンに対してイベントリスナを設定
stopButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // ルーレットの回転を停止
    clearInterval(intervalIds[index]);

    // 既に押された停止ボタンを無効化
    button.disabled = true;

    // 停止したルーレットの画像に応じたサウンドを再生するロジック
    const imagePath = roulettes[index].querySelector(".image").src; // 現在の画像のパスを取得
    const soundNumber = imagePath.match(/r(\d)\.jpg/)[1]; // 画像の番号を取得
    const audio = new Audio(`sounds/r${soundNumber}.mp3`); // 対応するサウンドファイルをロード
    audio.play(); // サウンドを再生

    // ゲームがクリア条件を満たしているかを確認
    checkWin();
  });
});

// リセットボタンがクリックされた時の動作を設定
resetButton.addEventListener("click", () => {
  // すべてのルーレットの回転を停止
  intervalIds.forEach((intervalId) => clearInterval(intervalId));

  // すべての停止ボタンを再度有効化
  stopButtons.forEach((button) => (button.disabled = false));

  // ルーレットの回転を再開
  startRoulettes();
});

// ルーレットの回転を開始する関数
function startRoulettes() {
  roulettes.forEach((roulette, index) => {
    intervalIds[index] = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1; // 1から6までのランダムな数字を生成
      const imagePath = `images/r${randomNumber}.jpg`; // ランダムな数字に対応する画像のパスを生成
      roulette.querySelector(".image").src = imagePath; // 画像を更新
    }, 100); // 0.1秒ごとに画像を更新
  });
}

// ゲームがクリア条件を満たしているかを確認する関数
function checkWin() {
  // すべての停止ボタンが押されているかを確認
  const allStopped = Array.from(stopButtons).every((button) => button.disabled);

  // すべての停止ボタンが押されている場合
  if (allStopped) {
    // すべてのルーレットが「r2.jpg」を表示しているかを確認
    const allR1 = Array.from(roulettes).every((roulette) =>
      roulette.querySelector(".image").src.includes("r2.jpg")
    );

    // すべてのルーレットが「r2.jpg」を表示している場合、ゲームクリアとする
    if (allR1) {
      alert("ゲームクリア！");
    }
  }
}

// 初期状態として、ルーレットの回転を開始
startRoulettes();
