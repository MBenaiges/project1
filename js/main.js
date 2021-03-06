'use strict'

const main = () => {

  //Crea el Dom
  const buildDom = (html) => {
    const main = document.querySelector('main');
    main.innerHTML = html;
    return main;
  };

  //Crea la pantalla principal
  const buildSplashScreen = () => {
    const splashScreen = buildDom(`
  <section class="splash-screen">
  <h1>Plat4ms</h1>
  <button id="button1">New Game!</button>
  </section>
  `);
  //Boton para ir a la pantalla del juego
  const startButton = document.querySelector('button');
  startButton.addEventListener('click', buildGameScreen);
  };

  //Crea la pantalla del juego
  const buildGameScreen = () => {
    const gameScreen = buildDom(`
    <h1>Plat4ms</h1>
    <section class = "game-screen">
    <div class="in-line">
      <div id="lives"></div> <div id="points"></div>
    </div>
    <canvas></canvas>
  `);
  //si se quiere audio debajo del canvas
  /* <audio autoplay loop>
        <source src="audio/game.mp3">
      </audio>
      <audio id="jump">
        <source src="audio/jump1.mp3">
      </audio>
    </section>
   */

    //Creamos canvas
    const width = document.querySelector('.game-screen').offsetWidth;
    const height = document.querySelector('.game-screen').offsetHeight;


    const canvasElement = document.querySelector('canvas');
    canvasElement.setAttribute('width',width);
    canvasElement.setAttribute('height',height);
    
    //Comprobamos que pasados 3 segundos salta a la pantalla de Game Over
    //setTimeout(buildGameOver, 3000);
    
    //Iniciamos juego
    const game = new Game(canvasElement);
    game.gameOverCallBack(buildGameOver);
    game.levelCompleteCallback(buildLevelComplete);
    
    game.startLoop();
    let leftPushed=false;
    let rightPushed=false;
    //movimiento lateral, en eje de X
    const setPlayerDirection = (event) => {
      if (event.code === 'ArrowLeft') {
          game.player.setDirection(-1);
          game.player.x--;
          leftPushed=true;
      } else if (event.code === 'ArrowRight') {
          game.player.setDirection(1);
          game.player.x++;
          rightPushed=true;
      };
    };

    //parar el jugador
    const stop = (event) => {
      if(event.code === 'ArrowLeft'){
        if(rightPushed){
          game.player.setDirection(1);
        } else {
          game.player.setDirection(0);
        }
        leftPushed = false;
      }else if (event.code === 'ArrowRight'){
        if(leftPushed){
          game.player.setDirection(-1);
        }else {
          game.player.setDirection(0);
        }
        rightPushed=false;
      }
    };
   
    
    //salta- si se apreta 'space' y no esta saltando, salta
      const jump = (event) => {
      if (event.code === 'Space' && game.player.noJumping === true){
        game.player.noJumping = false;
        game.player.jump = -50; //Altura salto
        game.player.y = game.player.y - 100;
        /*
        var audio = document.getElementById("jump");
        audio.play();
        */
      }
      
    }

    document.addEventListener('keydown',setPlayerDirection);
    document.addEventListener('keyup',stop);
    document.addEventListener('keydown', jump);
    
  }
    
  //Crear la pantalla del Game Complete
  const buildLevelComplete = (points) => {
    const gameLevelComplete = buildDom(`
    <section class="level-complete">
      <h2>Level Complete</h2>
      <h3>Thanks for playing!
      <div id="points"> Points </div></h3>
      <button class="button-2">Main Menu</button>
    </section>`);

  document.getElementById('points').innerText = `${points} Points!`;
  const mainMenuButton = document.querySelector('button');
  mainMenuButton.addEventListener('click',buildSplashScreen);
  }
  
  //Crea la pantalla de Game Over
  const buildGameOver = (points) => {
    const gameOverScreen = buildDom(`
    <section class="game-over">
      <h2>Game Over</h2>
      <h3>
      <div id="points"></div>
      </h3>
      <div>
        <button>Restart</button> <button id="menu">Main Menu</button>
      </div>
    </section>
    `);
    document.getElementById('points').innerText = `${points} Points!`;
  //boton de restart buton, k nos vuelve a llevar a la pantalla del juego
  const restartButton = document.querySelector('button');
  restartButton.addEventListener('click',buildGameScreen);
  const mainMenuButton = document.getElementById('menu');
  mainMenuButton.addEventListener('click',buildSplashScreen);
  }

  buildSplashScreen();

};

window.addEventListener('load', main);