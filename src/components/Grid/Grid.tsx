import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { GridLayout } from './Grid.styled';
import { Card } from '../Card';
import { GameGrid } from '../../types/GameGrid';

const SECOND = 1000;

export type GridProps = {
  gameGrid: GameGrid;
  increaseScore: () => void;
};

export const Grid = ({ gameGrid, increaseScore }: GridProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [revealedValues, setRevealedValues] = useState<number[]>([]);
  const [itemsToDiscard, setItemsToDiscard] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);

  const discardItems = useCallback((items: number[]) => {
    setItemsToDiscard(items);
    setBusy(true);
    setTimeout(() => {
      setItemsToDiscard([]);
      setBusy(false);
    }, SECOND);
  }, []);

  const handleMatch = useCallback(() => {
    const firstValue = gameGrid[selectedItems[0]];
    const secondValue = gameGrid[selectedItems[1]];
    if (firstValue === secondValue) {
      setRevealedValues(revealedValues.concat(firstValue));
      increaseScore();
    } else {
      discardItems(selectedItems);
    }
  }, [gameGrid, increaseScore, discardItems, revealedValues, selectedItems]);

  useEffect(() => {
    if (selectedItems.length === 2) {
      handleMatch();
      setSelectedItems([]);
    }
  }, [handleMatch, selectedItems.length]);

  const handleSelect = useCallback(
    (itemIndex: number) => {
      if (!busy) {
        setSelectedItems(selectedItems.concat(itemIndex));
      }
    },
    [busy, selectedItems]
  );

  const gameGridCards = useMemo(
    () =>
      gameGrid.map((item, index) => (
        <Card
          key={index}
          value={item}
          revealed={
            selectedItems.includes(index) ||
            itemsToDiscard.includes(index) ||
            revealedValues.includes(item)
          }
          onSelect={() => handleSelect(index)}
        />
      )),
    [gameGrid, handleSelect, itemsToDiscard, revealedValues, selectedItems]
  );

  return <GridLayout>{gameGridCards}</GridLayout>;
};
