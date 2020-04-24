import React, { useMemo } from 'react';
import { Square, RevealedCardLayout } from './Card.styled';

const getImageSource = (value: number) =>
  `https://www.memozor.com/jeux/jquery/objects_diy/image${value}.jpg`;

export type CardProps = {
  value: number;
  onSelect: () => void;
  revealed?: boolean;
};

export const Card = ({ value, onSelect, revealed }: CardProps) => {
  const imageSource = useMemo(() => getImageSource(value), [value]);

  return (
    <>
      {revealed ? (
        <RevealedCardLayout>
          <img src={imageSource} alt='' />
        </RevealedCardLayout>
      ) : (
        <Square onClick={onSelect}/>
      )}
    </>
  );
};
