import React from 'react';
import { Header } from './GridHeader.styled';

export type GridHeaderProps = {
  score: number;
  gameOver?: boolean;
};

export const GridHeader = ({ score, gameOver }: GridHeaderProps) => (
  <Header>
    <div>Score: {score}</div>
    {gameOver && <div>Game Over - Congratulation!</div>}
  </Header>
);
