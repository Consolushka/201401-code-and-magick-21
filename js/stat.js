'use strict';

const NAMES = [`Катя`, `Влад`, `Вера`, `Макс`, `Оля`, `Иван`, `Коля`, `Маша`, `Вася`, `Витя`, `Вова`, `Эдик`, `Федя`, `Егор`, `Митя`, `Толя`];
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const TEXT_HEIGHT = 25;
const TEXT_WIDTH = 80;
const MAX_BAR_HEIGHT = CLOUD_HEIGHT - TEXT_HEIGHT * 4 - GAP;
const barWidth = 20;
let MAX_SCORE;
const gamers = [
  {
    name: `Вы`,
    score: getRandomInt(1000),
    color: `rgba(255, 0, 0, 1)`
  }
];

for (let i = 0; i < 4; i++) {
  gamers.push(
      {
        name: NAMES[getRandomInt(7)],
        score: getRandomInt(1000),
        color: `hsl(246, ${getRandomInt(100)}%, 50%)`
      }
  );
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getMinValue(values, keyName) {
  let minValue;
  if (keyName === undefined) {
    minValue = Math.min.apply(null, values);
  } else {
    let min = values.reduce(function (prev, curr) {
      if (prev[keyName] < curr[keyName]) {
        return prev;
      }
      return curr;
    });
    minValue = min[keyName];
  }
  return minValue;
}

window.renderStatistics = function (ctx) {

  MAX_SCORE = getMinValue(gamers, `score`);
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.3)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT);
  ctx.fillText(`Список результатов: `, CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT * 2);

  gamers.forEach(function (gamer, index) {
    let barHeight = MAX_BAR_HEIGHT * (MAX_SCORE / gamer.score);
    ctx.fillStyle = `#000`;
    ctx.fillText(
        gamer.name,
        CLOUD_X + GAP + (TEXT_WIDTH + GAP) * index,
        CLOUD_Y + CLOUD_HEIGHT - GAP
    );
    ctx.fillStyle = gamer.color;
    ctx.fillRect(
        CLOUD_X + GAP + (TEXT_WIDTH + GAP) * index,
        CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT - barHeight,
        barWidth,
        barHeight
    );
    ctx.fillStyle = `#000`;
    ctx.fillText(
        gamer.score.toString(),
        CLOUD_X + GAP + (TEXT_WIDTH + GAP) * index,
        CLOUD_Y + (CLOUD_HEIGHT - barHeight - GAP - TEXT_HEIGHT)
    );
  });
};
