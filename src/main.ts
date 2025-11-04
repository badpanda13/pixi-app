import { Application, Assets } from 'pixi.js';
import { addCoins, animateCoins } from './addCoins';

const app: Application = new Application();

const coins: any[] = [];

async function setup() {
  await app.init({ background: '#1099bb', width: window.innerWidth, height: 500 });

  const gameContainer = document.getElementById('gameContainer');
  if (gameContainer && app.canvas) {
    gameContainer.innerHTML = '';
    gameContainer.appendChild(app.canvas);
    console.log('Canvas добавлен в контейнер');
  } else {
    console.error('Не найден gameContainer или canvas');
    return;
  }
}

async function preload() {
  const assets = [
    { alias: 'coin1', src: '/public/assets/coin1.png' },
    { alias: 'coin2', src: '/public/assets/coin2.png' },
    { alias: 'coin3', src: '/public/assets/coin3.png' },
    { alias: 'coin4', src: '/public/assets/coin4.png' },
    { alias: 'coin5', src: '/public/assets/coin5.png' },
  ];

  await Assets.load(assets);
}

(async () => {
  await setup();
  await preload();
  addCoins(app, coins);

  app.ticker.add(time => {
    animateCoins(app, coins, time);
  });
})();
