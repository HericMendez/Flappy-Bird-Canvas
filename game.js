const sprites = new Image();
sprites.src = "./sprites.png";

const hitSound = new Audio();
hitSound.src = "./efeitos/efeitos_hit.wav"


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
        if(collisionCheck(navinha, chao)){
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
    
      desenha() {
        context.drawImage(
          //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight >> Parâmetros da função DrawImage
          sprites, 
          //image: Arquivo contendo as sprites (sprites.png)
    
          navinha.spriteX, navinha.spriteY, 
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




const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
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

const background = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
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

const globais = {};

let telaAtiva = {};
const trocaTela =(novaTela)=>{
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
      telaAtiva.inicializa();
    }
};
console.log(globais);

const Telas={
    inicio:{
        inicializa(){
          globais.navinha = newNavinha();
          
        },
        
        desenha(){
            
            background.desenha();
            chao.desenha();
            globais.navinha.desenha();
            getReady.desenha();
        },

        click(){
            trocaTela(Telas.jogo)
            
        }, 

        update(){
           //getReady.update();
        }
    }, 

    jogo:{
        desenha(){
            //Atualiza a tela do jogo(sem isso o game não se move):
            globais.navinha.update();
        },

        click(){
          globais.navinha.jump();
          console.log(globais)
        },

        update(){
            //A ordem importa! Itens de baixo da lista sobrepõem os de cima!
            background.desenha();
            chao.desenha();
            globais.navinha.desenha();
        }
    }


};


const loop = () => {
  
  telaAtiva.desenha();
  telaAtiva.update();
  requestAnimationFrame(loop);
};

window.addEventListener('click', ()=>{
    telaAtiva.click();
})

trocaTela(Telas.inicio);
loop();
