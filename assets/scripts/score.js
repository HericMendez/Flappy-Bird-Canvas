const browserDB = getLocalStorage();

const highscore = {
  last: browserDB.last,
  best: browserDB.best,
  tries: browserDB.tries,
};

const Score = () => {
  const score = {
    pontos: 0,

    desenhaAtual() {
      context.font = '12px "Press Start 2P", cursive';
      context.fillStyle = "white";
      context.fillText(
        `Score: ${this.pontos}s`,
        canvas.width / 2,
        canvas.height - (baseHeight + 160)
      ),
        score.pontos;
    },
    desenhaTopScore() {
      context.font = '12px "Press Start 2P", cursive';
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText(
        `Top Score: ${highscore.best} Tries: ${highscore.tries}`,
        canvas.width / 2,
        canvas.height - (baseHeight + 160)
      ),
        (context.font = '7px "Press Start 2P", cursive');
      context.fillStyle = "red";
      context.fillText(
        `Tap/click or press Spacebar to start...`,
        canvas.width / 2,
        canvas.height - 50
      );
    },

    update() {
      if (frames % 60 === 0) {
        this.pontos++;
      }

      if (this.pontos > highscore.best) {
        highscore.best = highscore.last;
      }

      //
    },
  };

  return score;
};
