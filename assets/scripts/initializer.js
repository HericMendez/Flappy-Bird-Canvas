const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_score")) ?? {
    last: 0,
    best: 0,
    tries: 0,
  };
const setLocalStorage = (item) =>
  localStorage.setItem("db_score", JSON.stringify(item));

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");





const sprites = new Image();
const spritesCenario = new Image();
sprites.src = "./assets/sprites/sprites.png";
spritesCenario.src = "./assets/sprites/sprites_cenario.png";

const jumpSound = new Audio();
const hitSound = new Audio();
const bgMusic = new Audio();

jumpSound.src = "./assets/sounds/jump.wav";
hitSound.src = "./assets/sounds/hit.wav";
bgMusic.src = "./assets/sounds/giorno.mp3";
