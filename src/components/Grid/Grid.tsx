import React from 'react';
import { ContainerProps } from '../../types/ContainerProps';
import { GridLayout } from './Grid.styled';

export type GridProps = ContainerProps;

export const Grid = ({ children }: GridProps) => (
  <GridLayout>{children}</GridLayout>
);
