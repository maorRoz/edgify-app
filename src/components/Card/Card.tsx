import React from 'react';
import { CardLayout } from './Card.styled';

export type CardProps = {
  value: number;
  revealed?: boolean;
};

export const Card = ({ value, revealed }: CardProps) => <CardLayout />;
