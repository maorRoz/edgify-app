import { GameGrid } from '../types/GameGrid';
import sampleSize from 'lodash/sampleSize';
import shuffle from 'lodash/shuffle';
import { MIN_VALUE, MAX_VALUE } from './const';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const availableValues: number[] = [...Array(MAX_VALUE).keys()].filter(
  (num) => num >= MIN_VALUE
);

/**
 *
 *
 * Returns a shuffled array of length `numberOfGridItems` with values of inclusive range `MIN_VALUE`-`MAX_VALUE`, where each value appear only twice
 *
 *   @param numberOfGridItems an even number between the inclusive of 2 and 42
 */
export const GameGridGenerator = (numberOfGridItems = 2): GameGrid => {
  const chosenValuesArray = sampleSize<number>(
    availableValues,
    numberOfGridItems / 2
  );

  const itemsArray = chosenValuesArray.concat(chosenValuesArray);
  const shuffledItemsArray = shuffle<number>(itemsArray);
  return shuffledItemsArray;
};
