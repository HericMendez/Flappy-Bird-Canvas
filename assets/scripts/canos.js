function Canos() {
  const canos = {
    largura: 52,
    altura: 400,
    low: {
      spriteX: 0,
      spriteY: 169,
    },

    gap: 200,

    high: {
      spriteX: 52,
      spriteY: 169,
    },

    pares: [],

    update() {
      if (frames % 100 === 0) {
        canos.pares.push({ x: canvas.width, y: -180 * (Math.random() + 1) });
      }

      this.pares.forEach((par) => {
        par.x = par.x - 2;
        if (par.x <= -50) canos.pares.shift();
        if (colideComCanos(par)) {
          hitSound.play();
          highscore.tries++;
          highscore.last = score.pontos;

          trocaTela(Telas.fim);

          console.log("Game Over!");
          return;
        }
      });
    },

    desenha() {
      canos.pares.forEach((par) => {
        const randomY = par.y;
        const canoGap = 100;

        const canoHighX = par.x;
        const canoHighY = randomY;

        const canoLowX = par.x;
        const canoLowY = canos.altura + canoGap + randomY;

        context.drawImage(
          sprites,
          canos.high.spriteX,
          canos.high.spriteY,
          canos.largura,
          canos.altura,
          canoHighX,
          canoHighY,
          canos.largura,
          canos.altura
        );

        context.drawImage(
          sprites,
          canos.low.spriteX,
          canos.low.spriteY,
          canos.largura,
          canos.altura,
          canoLowX,
          canoLowY,
          canos.largura,
          canos.altura
        );

        par.canoHigh = {
          x: canoHighX,
          y: canos.altura + canoHighY,
        };
        par.canoLow = {
          x: canoLowX,
          y: canoLowY,
        };
      });
    },
  };
  return canos;
}

const colideComCanos = (cano) => {
  const birdTop = bird.y;
  const birdBottom = bird.y + bird.altura;

  if (bird.x + bird.largura >= cano.x) {
    // if(navinhaTop<=cano.canoHigh.y || navinhaBottom >=cano.canoLow.y) return true;
    if (birdTop <= cano.canoHigh.y) return true;
    if (birdBottom >= cano.canoLow.y) return true;
  }
  return false;
};
