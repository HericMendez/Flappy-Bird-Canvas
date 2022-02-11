const newTelaGameOver = () => {
  const goldMedal = {
    spriteX: 0,
    spriteY: 124,
    largura: 44,
    altura: 44,
    x: 72,
    y: 130,
  };

  const silverMedal = {
    spriteX: 48,
    spriteY: 78,
    largura: 44,
    altura: 44,
    x: 72,
    y: 130,
  };
  const bronzeMedal = {
    spriteX: 48,
    spriteY: 124,
    largura: 44,
    altura: 44,
    x: 72,
    y: 130,
  };

  const gameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: canvas.width / 2 - 226 / 2,
    y: 50,

    desenha() {
      context.drawImage(
        sprites,
        gameOver.spriteX,
        gameOver.spriteY,
        gameOver.largura,
        gameOver.altura,
        gameOver.x,
        gameOver.y,
        gameOver.largura,
        gameOver.altura
      );

      context.font = '12px "Press Start 2P", cursive';
      context.fillStyle = "#e86100";
      context.textAlign = "right";
      context.fillText(
        highscore.last,
        canvas.width / 2 + 28,
        canvas.height - 340
      );
      context.fillText(
        highscore.best,
        canvas.width / 2 + 88,
        canvas.height - 340
      );
      context.fillText(
        highscore.tries,
        canvas.width / 2 + 88,
        canvas.height - 305
      );

      if (highscore.last >= highscore.best) {
        context.drawImage(
          sprites,
          goldMedal.spriteX,
          goldMedal.spriteY,
          goldMedal.largura,
          goldMedal.altura,
          goldMedal.x,
          goldMedal.y,
          goldMedal.largura,
          goldMedal.altura
        );

        context.font = '10px "Press Start 2P", cursive';
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText(
          "New Record!!!",
          canvas.width / 2 + 10,
          canvas.height - 285
        );
      } else if (highscore.last >= highscore.best - 2) {
        context.drawImage(
          sprites,
          silverMedal.spriteX,
          silverMedal.spriteY,
          silverMedal.largura,
          silverMedal.altura,
          silverMedal.x,
          silverMedal.y,
          silverMedal.largura,
          silverMedal.altura
        );
      } else {
        context.drawImage(
          sprites,
          bronzeMedal.spriteX,
          bronzeMedal.spriteY,
          bronzeMedal.largura,
          bronzeMedal.altura,
          bronzeMedal.x,
          bronzeMedal.y,
          bronzeMedal.largura,
          bronzeMedal.altura
        );
      }
    },
  };
  return gameOver;
};
