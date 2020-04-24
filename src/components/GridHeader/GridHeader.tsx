import React from 'react';
import { Score } from './GridHeader.styled';


export type GridHeaderProps = {
  score: number;
};

export const GridHeader = ({ score }: GridHeaderProps) => (
  <Score>Score: {score}</Score>
);
