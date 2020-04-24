import React, { useState, useCallback, useMemo } from 'react';
import { Grid } from '../Grid';
import { GridHeader } from '../GridHeader';
import { generateGameGrid } from '../../generateGameGrid/generateGameGrid';

const POINTS = 10;

export const GameBoard = () => {
  const [score, setScore] = useState(0);

  const gameGrid = useMemo(() => generateGameGrid(30), []);

  const increaseScore = useCallback(() => setScore(score + POINTS), [score]);

  return (
    <>
      <GridHeader score={score} />
      <Grid gameGrid={gameGrid} increaseScore={increaseScore} />
    </>
  );
};
