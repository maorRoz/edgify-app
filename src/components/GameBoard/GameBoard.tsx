import React, { useState, useCallback, useMemo } from 'react';
import { Grid } from '../Grid';
import { GridHeader } from '../GridHeader';
import { POINTS, NUMBER_OF_GRID_ITEMS } from './const';
import { GameGrid } from '../../types/GameGrid';

export type GameBoardProps = {
  generateGameGrid: (numberOfGridItems: number) => GameGrid;
};

export const GameBoard = ({ generateGameGrid }: GameBoardProps) => {
  const [score, setScore] = useState(0);

  const gameGrid = useMemo(() => generateGameGrid(NUMBER_OF_GRID_ITEMS), [
    generateGameGrid
  ]);

  const isGameOver = useMemo(
    () => score === (NUMBER_OF_GRID_ITEMS / 2) * POINTS,
    [score]
  );

  const increaseScore = useCallback(() => setScore(score + POINTS), [score]);

  return (
    <>
      <GridHeader score={score} gameOver={isGameOver} />
      <Grid gameGrid={gameGrid} increaseScore={increaseScore} />
    </>
  );
};
