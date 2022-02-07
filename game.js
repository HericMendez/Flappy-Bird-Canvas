
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const sprites = new Image();
sprites.src = "./sprites.png";


let frames = 0; 
const hitSound = new Audio();
hitSound.src = "./efeitos/efeitos_hit.wav"



const gameObjects = [
  /*Chão:*/
  {
    
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,

  update(){
    //console.log("ground move")
    this.x = parallax(this, 1);

    
  },
  desenha() {
    context.drawImage(
      //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight >> Parâmetros da função DrawImage
      sprites,
      this.spriteX, this.spriteY,
      this.largura, this.altura,
      this.x, this.y,
      this.largura, this.altura
    );

    
      
    context.drawImage(
      //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight >> Parâmetros da função DrawImage
      sprites,
      this.spriteX, this.spriteY,
      this.largura, this.altura,
      this.x + this.largura, this.y,
      this.largura, this.altura
    );
  }
  },
  /*Plano de fundo:*/
  {
    spriteX: 390,
      spriteY: 0,
      largura: 275,
      altura: 204,
      x: 0,
      y: canvas.height - 204,

      update() {
        this.x = parallax(this, 0.3);
      },

      desenha() {
        //Preenche a cor do plano de fundo:
        context.fillStyle = "#70c5ce";
        context.fillRect(0, 0, canvas.width, canvas.height);
    
        context.drawImage(
          sprites,
          this.spriteX, this.spriteY,
          this.largura, this.altura,
          this.x, this.y,
          this.largura, this.altura
        );
        //Completa a sprite do plano de fundo até o fim da tela do Canvas:
        context.drawImage(
          sprites,
          this.spriteX, this.spriteY,
          this.largura, this.altura,
          this.x + this.largura, this.y,
          this.largura, this.altura
        );
      },
  },
  /*Canos:*/
  {

    largura: 52,
  altura: 400,
  high:{
    spriteX: 52,
    spriteY: 169,
  },
  low: {
    spriteX: 0,
    spriteY: 169,
  },
  gap: 80,
    desenha() {
      const randomY = -120;
      const PipeGapHeight = 0;

      const pipeHighX = 220;
      const pipeHighY = randomY;

      const pipeLowX = 220;
      const pipeLowY = this.altura +PipeGapHeight+randomY;

       //Canos do topo:
      context.drawImage(
        sprites,
        this.high.spriteX, this.high.spriteY,
        this.largura, this.altura,
        pipeHighX, pipeHighY,
        this.largura, this.altura)


      //Canos do chão:
      context.drawImage(
        sprites,
        this.low.spriteX, this.low.spriteY,
        this.largura, this.altura,
        pipeLowX, pipeLowY,
        this.largura, this.altura)
      
     

      
    }
  },
  /*Tela de Início:*/
  {

      spriteX: 134,
      spriteY: 0,
      largura: 174,
      altura: 152,
      x: (canvas.width/2) - 174/2,
      y: 50,
    
      desenha() {
        context.drawImage(
    
          sprites,
          this.spriteX, this.spriteY,
          this.largura, this.altura,
          this.x, this.y,
          this.largura, this.altura
        );
      },
    
  }

 
]


const Telas={
  inicio:{
      inicializa(){
        globais.navinha = createPlayerObject();
        globais.chao = createEnvironmentObject(gameObjects[0]);
        globais.background = createEnvironmentObject(gameObjects[1]);
        globais.pipes = createEnvironmentObject(gameObjects[2]);
        globais.getready = createEnvironmentObject(gameObjects[3]);
        
      },
      
      desenha(){    
        globais.background.desenha();    
        globais.pipes.desenha();
        globais.chao.desenha();
        globais.navinha.desenha();
        globais.getready.desenha();
      },



      click(){
        trocaTela(Telas.jogo)
          
      }, 

      update(){
        globais.chao.update();
        globais.background.update();
      }
  }, 

  jogo:{
      desenha(){
        //Atualiza a tela do jogo(sem isso o game não se move):
        globais.background.update();
        globais.navinha.update();
        globais.chao.update();
      },

      click(){
        globais.navinha.jump();
      },

      update(){
          //A ordem importa! Itens de baixo da lista sobrepõem os de cima!
          globais.background.desenha();
          globais.chao.desenha();
          globais.navinha.desenha();
      }
  }


};

const collisionCheck =(objetoPlayer, objetoCenario)=>{
  const navinhaY = objetoPlayer.y + objetoPlayer.altura;
  const cenarioY = objetoCenario.y;
  
  if(navinhaY >= cenarioY){
    return true;
  }

  return false;
};

const parallax = (object, speed) =>{
  const chaoMove = speed;
  const chaoRepete = object.largura /2;
  const movimentacao = object.x - chaoMove;
  pontodeLoop = movimentacao % chaoRepete; 

  return pontodeLoop; 
}

const createPlayerObject = () =>{
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

     },

     jump(){
       console.log("up ", this.speed);
       this.speed= -this.jumpHeight;
       
     },

     movimentos: [
       {spriteX: 0, spriteY: 0},
       {spriteX: 0, spriteY: 26},
       {spriteX: 0, spriteY: 52},
     ],

     frameAtual: 0,
     updateFrame(){
       const frameInterval = 10;
       const frameLimit = frames%frameInterval ===0;
       if(frameLimit){
                 const baseIncrement = 1;
       const increment = baseIncrement +this.frameAtual;
       const baseRepeat = this.movimentos.length;
       this.frameAtual = increment%baseRepeat;
       }

     },
   
     desenha() {
         this.updateFrame();
         const {spriteX, spriteY} = this.movimentos[this.frameAtual];

       
       
       context.drawImage(
         //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight >> Parâmetros da função DrawImage
         sprites, 
         //image: Arquivo contendo as sprites (sprites.png)
   
         spriteX, spriteY, 
         //sX, sY: Coordenadas X,Y da posição da sprite no arquivo de origem
   
         this.largura, this.altura,
         //sWidth, sHeight: Largura, altura (X,Y) da sprite
   
         this.x, this.y,
         //dX, dY: Coordenadas X,Y da  posição da sprite no Canvas
   
         this.largura, this.altura,
         //dWidth, dHeight: Proporção X,Y da sprite no Canvas. Utiliza os mesmos valores de "sWidth, sHeight" em uma escala 1:1
         
         
       );
     },
  }
  return navinha;
}

const createEnvironmentObject = (object) =>{
  const newObject = object;
  return newObject;
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




const loop = () => {
  
  telaAtiva.desenha();
  telaAtiva.update();

  frames +=1;
  requestAnimationFrame(loop);
};

window.addEventListener('click', ()=>{
    telaAtiva.click();
});

trocaTela(Telas.inicio);
loop();
