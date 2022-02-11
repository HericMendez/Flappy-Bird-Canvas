function Cenario() {
  const cenario = {
    paisagem: {
      spriteX: 390,
      spriteY: 0,
      largura: 275,
      altura: 204,
      def: 2,
      x: 0,
      y: canvas.height - 204,

      update() {
        this.x = parallax(this, 0.75);
      },
      desenha() {
        //Preenche a cor do plano de fundo:
        context.fillStyle = "#70c5ce";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.drawImage(
          sprites,
          this.spriteX,
          this.spriteY,
          this.largura,
          this.altura,
          this.x,
          this.y,
          this.largura,
          this.altura
        );
        //Completa a sprite do plano de fundo até o fim da tela do Canvas:
        context.drawImage(
          sprites,
          this.spriteX,
          this.spriteY,
          this.largura,
          this.altura,
          this.x + this.largura,
          this.y,
          this.largura,
          this.altura
        );
      },
    },

    chao: {
      spriteX: 0,
      spriteY: 610,
      largura: 224,
      altura: 112,
      abc: 1,
      x: 0,
      y: canvas.height - 112,

      update() {
        cenario.chao.x = parallax(this, 2);
      },

      desenha() {
        context.drawImage(
          //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight >> Parâmetros da função DrawImage
          sprites,
          this.spriteX,
          this.spriteY,
          this.largura,
          this.altura,
          this.x,
          this.y,
          this.largura,
          this.altura
        );

        context.drawImage(
          //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight >> Parâmetros da função DrawImage
          sprites,
          this.spriteX,
          this.spriteY,
          this.largura,
          this.altura,
          this.x + this.largura,
          this.y,
          this.largura,
          this.altura
        );
      },
    },
  };

  return cenario;
}

const parallax = (object, speed) => {
  const objetoMove = speed;
  const objetoRepete = object.largura / 2;
  const movimentacao = object.x - objetoMove;
  const parallax = movimentacao % objetoRepete;

  return parallax;
};

const colideComCenario = (objetoPlayer, objetoCenario) => {
  const birdY = objetoPlayer.y + objetoPlayer.altura;
  const cenarioY = objetoCenario.y;

  if (birdY >= cenarioY || birdY < 0) {
    return true;
  }

  return false;
};
