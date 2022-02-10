const getLocalStorage = () =>JSON.parse(localStorage.getItem('db_score')) ?? {last: 0, best: 0, tries: 0};
const setLocalStorage = (item) => localStorage.setItem('db_score', JSON.stringify(item));


const browserDB = getLocalStorage()
const sprites = new Image();
sprites.src = "./sprites.png";

const jumpSound = new Audio();
const hitSound = new Audio();
const bgMusic = new Audio();

jumpSound.src  = "./efeitos/jump.wav"
hitSound.src = "./efeitos/hit.wav"
bgMusic.src = "./efeitos/giorno.mp3"



let frames = 0;

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const placar = {
  last: browserDB.last,
  best: browserDB.best,
  tries:browserDB.tries,
}

const colideComChao =(objetoPlayer, objetoCenario)=>{
  const navinhaY = objetoPlayer.y + objetoPlayer.altura;
  const cenarioY = objetoCenario.y;

  if(navinhaY >= cenarioY || navinhaY <0){
    
    return true;
  }

  return false;
};

const colideComCanos=(cano)=>{
  const navinhaTop = globais.navinha.y;
  const navinhaBottom = globais.navinha.y +globais.navinha.altura;
  
  if((globais.navinha.x+ globais.navinha.largura)>=cano.x){
     // if(navinhaTop<=cano.canoHigh.y || navinhaBottom >=cano.canoLow.y) return true;
     if(navinhaTop<=cano.canoHigh.y) return true;
     if(navinhaBottom>=cano.canoLow.y) return true;
  }
  return false;
 
}





const parallax = (object, speed) =>{
  const objetoMove = speed;
  const objetoRepete = object.largura /2;
  const movimentacao = object.x - objetoMove;
  const parallax = movimentacao % objetoRepete; 

  return parallax; 
}


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
        if(colideComChao(navinha, globais.chao)){
          placar.tries++;
          placar.last = globais.score.pontos;
          hitSound.play();
          trocaTela(Telas.fim)
           return;
        }


        //Velocidade/aceleração de queda do objeto "navinha":
        this.speed = this.speed + this.gravity;
        this.y = this.y + this.speed;

        //console.log(navinha.speed)


      },

      jump(){
        jumpSound.play();
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
    chao.x = parallax(chao, 2)
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
    background.x = parallax(background, 0.75);
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

const newCanos =()=>{
  const canos = {
    largura: 52,
    altura: 400,
    low:{
      spriteX: 0,
      spriteY: 169,
    },

    gap: 200,

    high:{
      spriteX: 52,
      spriteY: 169,
    },

    pares: [],

    update(){
      if(frames%100===0){
        canos.pares.push({x: canvas.width , y: -180 * (Math.random()+1)});
      }

      this.pares.forEach((par) => {
        par.x = par.x-2 
        if(par.x <=-50) canos.pares.shift();
        if(colideComCanos(par)){

         hitSound.play();
         placar.tries++;
         placar.last = globais.score.pontos;

          
          trocaTela(Telas.fim)

            console.log("Game Over!");
            return;
        } 
        
      });

      
    },


    desenha(){

      canos.pares.forEach((par)=>{

      const randomY = par.y;
      const canoGap = 100 ;

      const canoHighX = par.x;
      const canoHighY = randomY;

      const canoLowX = par.x;
      const canoLowY = canos.altura + canoGap + randomY;

        context.drawImage(
          sprites,
          canos.high.spriteX, canos.high.spriteY,
          canos.largura, canos.altura,
          canoHighX, canoHighY,
          canos.largura, canos.altura
        )
          
        context.drawImage(
          sprites,
          canos.low.spriteX, canos.low.spriteY,
          canos.largura, canos.altura,
          canoLowX, canoLowY,
          canos.largura, canos.altura
        )

        par.canoHigh = {
          x: canoHighX,
          y: canos.altura + canoHighY
        }
        par.canoLow = {
          x: canoLowX,
          y: canoLowY
        }


      })

      
    }
  }
  return canos;
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

const newTelaGameOver = () =>{
  const goldMedal = {
    spriteX: 0,
    spriteY: 124,
    largura: 44,
    altura: 44,
    x: 72,
    y: 130,  
  }

  const silverMedal = {
    spriteX: 48,
    spriteY: 78,
    largura: 44,
    altura: 44,
    x: 72,
    y: 130,  
  }
  const bronzeMedal = {
    spriteX: 48,
    spriteY: 124,
    largura: 44,
    altura: 44,
    x: 72,
    y: 130,  
  }



  const gameOver = {
  spriteX: 134,
  spriteY: 153,
  largura: 226,
  altura: 200,
  x: (canvas.width/2) - 226/2,
  y: 50,

  desenha() {
    context.drawImage(

      sprites,
      gameOver.spriteX, gameOver.spriteY,
      gameOver.largura, gameOver.altura,
      gameOver.x, gameOver.y,
      gameOver.largura, gameOver.altura
    );





    context.font = '12px "Press Start 2P", cursive';
    context.fillStyle = '#e86100';
    context.textAlign = 'right';
    context.fillText(placar.last, (canvas.width/2)+28 , canvas.height-340);
    context.fillText(placar.best, (canvas.width/2)+88 , canvas.height-340);
    context.fillText(placar.tries, (canvas.width/2)+88, canvas.height-305);

    if(placar.last>=placar.best){
      context.drawImage(
        sprites,
        goldMedal.spriteX, goldMedal.spriteY,
        goldMedal.largura, goldMedal.altura,
        goldMedal.x, goldMedal.y,
        goldMedal.largura, goldMedal.altura
      );
      
      context.font = '10px "Press Start 2P", cursive';
      context.fillStyle = 'red';
      context.textAlign = 'center';
      context.fillText("New Record!!!", (canvas.width/2)+10, canvas.height-285);

    }else if(placar.last>=placar.best-2){
      context.drawImage(
        sprites,
        silverMedal.spriteX, silverMedal.spriteY,
        silverMedal.largura, silverMedal.altura,
        silverMedal.x, silverMedal.y,
        silverMedal.largura, silverMedal.altura
      );
    }else{
      context.drawImage(
        sprites,
        bronzeMedal.spriteX, bronzeMedal.spriteY,
        bronzeMedal.largura, bronzeMedal.altura,
        bronzeMedal.x, bronzeMedal.y,
        bronzeMedal.largura, bronzeMedal.altura
      );
    }

  },
};
return gameOver;
}

const newScore =()=>{
  const score = {

    pontos: 0,


    desenhaAtual(){
      
      context.font = '12px "Press Start 2P", cursive';
      context.fillStyle = 'white';
      context.fillText(`Score: ${this.pontos}s`, (canvas.width/2), canvas.height-460),
      
      score.pontos;
    },
    desenhaTopScore(){

      context.font = '12px "Press Start 2P", cursive';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText(`Top Score: ${placar.best} Tries: ${placar.tries}`, (canvas.width/2), canvas.height-460),
      context.font = '7px "Press Start 2P", cursive';
      context.fillStyle = 'red';
      context.fillText(`Tap/click or press Spacebar to start...`, (canvas.width/2), canvas.height-50)
      

    },


    
    update(){

      if(frames%60===0){
        this.pontos++;   


      }
    
      if(this.pontos>placar.best){
        placar.best = placar.last;

       
      }
      

     // 

    },




  }

  return score;
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
          globais.paisagem = newPaisagem();
          globais.chao = newChao();
          globais.canos = newCanos();
          globais.telaGetReady = newTelaGetReady();
          globais.score = newScore();

        },

        desenha(){

            globais.paisagem.desenha();
           globais.canos.desenha();
            globais.chao.desenha();
            globais.navinha.desenha();
            
           globais.telaGetReady.desenha();
           globais.score.desenhaTopScore();

        },

        click(){
            trocaTela(Telas.jogo)
            bgMusic.play();
            

        }, 

        update(){

           globais.chao.update();
           globais.paisagem.update();
           //globais.canos.update();
           globais.score.update();
           
        }
    }, 

    jogo:{
        inicializa(){
           globais.score = newScore();
        },

        update(){
            //Atualiza a tela do jogo(sem isso o game não se move):
            globais.navinha.update();
            globais.canos.update();
            globais.chao.update();
            globais.paisagem.update();
            globais.score.update();

        },

        click(){
          globais.navinha.jump();
         // console.log(globais)
        },

        desenha(){
            //A ordem importa! Itens de baixo da lista sobrepõem os de cima!
            globais.paisagem.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            globais.navinha.desenha();
            globais.score.desenhaAtual();
            


        }
    },

    fim: {
      desenha(){
        
        setLocalStorage(placar);
        
        newTelaGameOver().desenha()

        
      },
      update(){

      },
      click(){
        trocaTela(Telas.inicio);
      }
    } 


};


const loop = () => {
  frames+=1;
  //console.log(frames)

  telaAtiva.update();
  telaAtiva.desenha();
  requestAnimationFrame(loop);
};



 
window.addEventListener('click', ()=>{
    telaAtiva.click();
})

window.onkeypress = (event)=> {
  if (event.which == 32) {
    telaAtiva.click();
  }
}
trocaTela(Telas.inicio);
loop();