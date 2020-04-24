import random from 'lodash/random';
import uniq from 'lodash/uniq';
import { GameGridGenerator } from './GameGridGenerator';
import { MIN_VALUE, MAX_VALUE } from './const';

describe('GameGridGenerator', () => {
  let numberOfGridItems: number;

  beforeEach(() => {
    const randomNumber = random(2, 42);
    numberOfGridItems =
      randomNumber % 2 === 0 ? randomNumber : randomNumber + 1;
  });

  test('length = numberOfGridItems', () => {
    const gameGrid = GameGridGenerator(numberOfGridItems);

    expect(gameGrid).toHaveLength(numberOfGridItems);

  })

  test('each value appear only twice', () => {
    const gameGrid = GameGridGenerator(numberOfGridItems);
    const uniqueValues = uniq(gameGrid);

    uniqueValues.forEach(uniqueValue => {
        const appearances = gameGrid.filter(item => item === uniqueValue).length;
        expect(appearances).toBe(2);
    })
  });

  test('each item is of inclusive range MIN_VALUE - MAX_VALUE', () => {
    const gameGrid = GameGridGenerator(numberOfGridItems);
    const validItems = gameGrid.filter(item => item >= MIN_VALUE || item <= MAX_VALUE);

    expect(validItems).toHaveLength(numberOfGridItems);
  })
});
