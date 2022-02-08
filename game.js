const sprites = new Image();
sprites.src = "./sprites.png";

const hitSound = new Audio();
hitSound.src = "./efeitos/efeitos_hit.wav"

let frames = 0;

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const collisionCheck =(objetoPlayer, objetoCenario)=>{
  const navinhaY = objetoPlayer.y + objetoPlayer.altura;
  const cenarioY = objetoCenario.y;

  if(navinhaY >= cenarioY){
    return true;
  }

  return false;
};


const newNavinha = () =>{
  const navinha = {
    //Posição da sprite no arquivo sprites.png:
      spriteX: 0, 
      spriteY: 0,
    //Tamanho da sprite no Canvas (tela de jogo):
      largura: 33,
      altura: 24,
    //Posição da imagem no Canvas:
      x: 10,
      y: 50,
    //Variáveis de controle de gravidade:
      gravity: 0.25,
      speed: 0,

      jumpHeight: 5,

      update(){
        if(collisionCheck(navinha, globais.chao)){
          hitSound.play();

          setTimeout(()=>{
            trocaTela(Telas.inicio)
          }, 500)
          console.log("colidiu")
          return;
        }


        //Velocidade/aceleração de queda do objeto "navinha":
        this.speed = this.speed + this.gravity;
        this.y = this.y + this.speed;

        //console.log(navinha.speed)


      },

      jump(){
        console.log("up ", this.speed);
        this.speed= -this.jumpHeight;

      },
      
     movimentos: [
      {spriteX: 0, spriteY: 0},
      {spriteX: 0, spriteY: 26},
      {spriteX: 0, spriteY: 52},
      {spriteX: 0, spriteY: 26},
      
    ],

    frameAtual: 0,
    //faz bater a asinha:
    updateFrame(){
      const frameInterval = 10;
      if(frameLimit = frames%frameInterval ===0){
      const baseIncrement = 1;
      const increment = baseIncrement +this.frameAtual;
      const baseRepeat = this.movimentos.length;
      this.frameAtual = increment%baseRepeat;
      }
//      console.log(this.frameAtual)

    },
      desenha() {

        navinha.updateFrame();
        const {spriteX, spriteY} = navinha.movimentos[navinha.frameAtual];

        context.drawImage(
          //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight >> Parâmetros da função DrawImage
          sprites, 
          //image: Arquivo contendo as sprites (sprites.png)

          spriteX, spriteY, 
          //sX, sY: Coordenadas X,Y da posição da sprite no arquivo de origem

          navinha.largura, navinha.altura,
          //sWidth, sHeight: Largura, altura (X,Y) da sprite

          navinha.x, navinha.y,
          //dX, dY: Coordenadas X,Y da  posição da sprite no Canvas

          navinha.largura, navinha.altura,
          //dWidth, dHeight: Proporção X,Y da sprite no Canvas. Utiliza os mesmos valores de "sWidth, sHeight" em uma escala 1:1


        );
      },
    };

    return navinha;
}

const newChao =()=>{
  const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,

  update(){
    chao.x = parallax(chao, 1)
  },

  desenha() {
    context.drawImage(
      //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight >> Parâmetros da função DrawImage
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura
    );

    context.drawImage(
      //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight >> Parâmetros da função DrawImage
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x + chao.largura, chao.y,
      chao.largura, chao.altura
    );
  },
};
 return chao;
}


const newPaisagem = () =>{
const background = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,

  update(){
    background.x = parallax(background, 0.3);
  },
  desenha() {
    //Preenche a cor do plano de fundo:
    context.fillStyle = "#70c5ce";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      sprites,
      background.spriteX, background.spriteY,
      background.largura, background.altura,
      background.x, background.y,
      background.largura, background.altura
    );
    //Completa a sprite do plano de fundo até o fim da tela do Canvas:
    context.drawImage(
      sprites,
      background.spriteX, background.spriteY,
      background.largura, background.altura,
      background.x + background.largura, background.y,
      background.largura, background.altura
    );
  },
};
  return background;
}

const newTelaGetReady = () =>{
  const getReady = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width/2) - 174/2,
  y: 50,

  desenha() {
    context.drawImage(

      sprites,
      getReady.spriteX, getReady.spriteY,
      getReady.largura, getReady.altura,
      getReady.x, getReady.y,
      getReady.largura, getReady.altura
    );
  },
};
return getReady;
}

const globais = {};

let telaAtiva = {};
const trocaTela =(novaTela)=>{
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
      telaAtiva.inicializa();
    }
};
console.log(globais);


const parallax = (object, speed) =>{
  const objetoMove = speed;
  const objetoRepete = object.largura /2;
  const movimentacao = object.x - objetoMove;
  const parallax = movimentacao % objetoRepete; 

  return parallax; 
}

const Telas={
    inicio:{
        inicializa(){
          globais.navinha = newNavinha();
          globais.paisagem = newPaisagem();
          globais.chao = newChao();
          globais.telaGetReady = newTelaGetReady();
        },

        desenha(){

            globais.paisagem.desenha();
            globais.chao.desenha();
            globais.navinha.desenha();
            globais.telaGetReady.desenha();
        },

        click(){
            trocaTela(Telas.jogo)

        }, 

        update(){
           //getReady.update();
           globais.chao.update();
           globais.paisagem.update();
        }
    }, 

    jogo:{
        desenha(){
            //Atualiza a tela do jogo(sem isso o game não se move):
            globais.navinha.update();
            globais.chao.update();
            globais.paisagem.update();

        },

        click(){
          globais.navinha.jump();
          console.log(globais)
        },

        update(){
            //A ordem importa! Itens de baixo da lista sobrepõem os de cima!
            globais.paisagem.desenha();
            globais.chao.desenha();
            globais.navinha.desenha();
        }
    }


};


const loop = () => {
  frames+=1;
  //console.log(frames)
  telaAtiva.desenha();
  telaAtiva.update();
  requestAnimationFrame(loop);
};

window.addEventListener('click', ()=>{
    telaAtiva.click();
})

trocaTela(Telas.inicio);
loop();