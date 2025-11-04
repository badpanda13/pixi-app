import { Application, Container, Sprite } from 'pixi.js';
import { incCoins, decCoins } from './counter';

interface CoinSprite extends Sprite {
  direction: number;
  speed: number;
  turnSpeed: number;
}

export const enum CoinState {
  hovered = 0xff0000,
  clicked = 0x00cc00,
  free = 0xffffff,
}

export function addCoins(app: Application, coins: any[]) {
  const coinContainer = new Container();
  app.stage.addChild(coinContainer);

  const coinCount = 20;
  const coinAssets = ['coin1', 'coin2', 'coin3', 'coin4', 'coin5'];

  for (let i = 0; i < coinCount; i++) {
    const coinAsset = coinAssets[i % coinAssets.length];
    const coin: CoinSprite = Sprite.from(coinAsset) as CoinSprite;
    coin.anchor.set(0.5);
    coin.direction = Math.random() * Math.PI * 2;
    coin.speed = 2 + Math.random() * 2;
    coin.turnSpeed = Math.random() - 0.8;
    coin.x = Math.random() * app.screen.width;
    coin.y = Math.random() * app.screen.height;
    coin.scale.set(0.3 + Math.random() * 0.02);
    coin.eventMode = 'static';
    coin.cursor = 'pointer';

    coin.on('pointerenter', () => {
      if (coin.tint === CoinState.clicked) {
        decCoins();
      }
      coin.tint = CoinState.hovered;
    });

    coin.on('pointerleave', () => {
      if (coin.tint == 0xff0000) {
        coin.tint = CoinState.free;
      }
    });

    coin.on('click', () => {
      coin.tint = CoinState.clicked;
      incCoins();
      console.log('Круг кликнут!');
    });

    coinContainer.addChild(coin);
    coins.push(coin);
  }
}

export function animateCoins(app: Application, coins: any[], time: any) {
  const delta = time.deltaTime;
  const stagePadding = 100;
  const boundWidth = app.screen.width + stagePadding * 2;
  const boundHeight = app.screen.height + stagePadding * 2;

  coins.forEach(coin => {
    coin.direction += coin.turnSpeed * 0.01;
    coin.x += Math.sin(coin.direction) * coin.speed;
    coin.y += Math.cos(coin.direction) * coin.speed;
    coin.rotation = -coin.direction - Math.PI / 2;

    if (coin.x < -stagePadding) {
      coin.x += boundWidth;
    }
    if (coin.x > app.screen.width + stagePadding) {
      coin.x -= boundWidth;
    }
    if (coin.y < -stagePadding) {
      coin.y += boundHeight;
    }
    if (coin.y > app.screen.height + stagePadding) {
      coin.y -= boundHeight;
    }
  });
}
