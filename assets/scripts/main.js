let frames = 0;

const Telas = {
  inicio: {
    inicializa() {
      bird = new Bird();
      cenario = new Cenario();
      canos = new Canos();
      telaStart = newTelaGetReady();
      score = Score();
    },

    desenha() {
      cenario.paisagem.desenha();
      canos.desenha();
      cenario.chao.desenha();
      bird.desenha();

      telaStart.desenha();
      score.desenhaTopScore();
    },

    click() {
      trocaTela(Telas.jogo);
      bgMusic.play();
    },

    update() {
      cenario.chao.update();
      cenario.paisagem.update();

      score.update();
    },
  },

  jogo: {
    inicializa() {
      score = Score();
    },

    update() {
      //Atualiza a tela do jogo(sem isso o game não se move):
      bird.update();

      canos.update();
      cenario.chao.update();
      cenario.paisagem.update();
      score.update();
    },

    click() {
      bird.jump();
    },

    desenha() {
      //A ordem importa! Itens de baixo da lista sobrepõem os de cima!
      cenario.paisagem.desenha();

      canos.desenha();
      cenario.chao.desenha();
      bird.desenha();
      score.desenhaAtual();
    },
  },

  fim: {
    desenha() {
      setLocalStorage(highscore);
      console.log(getLocalStorage);

      newTelaGameOver().desenha();
    },
    update() {},
    click() {
      trocaTela(Telas.inicio);
    },
  },
};

let telaAtiva = {};
const trocaTela = (novaTela) => {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
};

const loop = () => {
  frames += 1;
  //console.log(frames)

  telaAtiva.update();
  telaAtiva.desenha();
  requestAnimationFrame(loop);
};

window.addEventListener("click", () => {
  telaAtiva.click();
});

window.onkeypress = (event) => {
  if (event.which == 32) {
    telaAtiva.click();
  }
};
trocaTela(Telas.inicio);
loop();
