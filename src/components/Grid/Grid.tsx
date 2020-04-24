import React from 'react';
import { ContainerProps } from '../../types/ContainerProps';
import { GridLayout } from './Grid.styled';
import { generateGameGrid } from '../../generateGameGrid/generateGameGrid';
import { Card } from '../Card';

export type GridProps = ContainerProps;

export const Grid = ({ children }: GridProps) => {
  const gameGrid = generateGameGrid(30);

  const gameGridCards = gameGrid.map((item, index) => (
    <Card key={index} value={item} />
  ));

  return <GridLayout>{gameGridCards}</GridLayout>;
};
