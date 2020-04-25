import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { GameBoard, GameBoardProps } from './GameBoard';
import { GameGrid } from '../../types/GameGrid';
import { generateGameGrid } from '../../generateGameGrid';
import { NUMBER_OF_GRID_ITEMS, POINTS } from './const';
import uniq from 'lodash/uniq';

describe('<GameBoard>', () => {
  let props: GameBoardProps;

  let gameGrid: GameGrid;
  beforeEach(() => {
    gameGrid = generateGameGrid(NUMBER_OF_GRID_ITEMS);
    props = { generateGameGrid: jest.fn(() => gameGrid) };
  });

  test('init score', () => {
    const { getByText } = render(<GameBoard {...props} />);

    const Score = getByText(`Score: 0`);

    expect(Score).toBeInTheDocument();
  });

  test('clicked one item', () => {
    const { getAllByTestId, getAllByAltText, getByText } = render(
      <GameBoard {...props} />
    );

    const [selectedValue] = gameGrid;

    const [Square] = getAllByTestId(`square-${selectedValue}`);

    fireEvent.click(Square);

    const Squares = getAllByTestId(`square-${selectedValue}`);
    const imgElements = getAllByAltText(`revealed-${selectedValue}-image`);
    const Score = getByText(`Score: 0`);

    expect(Squares).toHaveLength(1);
    expect(imgElements).toHaveLength(1);
    expect(Score).toBeInTheDocument();
  });

  test('clicked two matched items', () => {
    const {
      getAllByTestId,
      queryAllByTestId,
      getAllByAltText,
      getByText
    } = render(<GameBoard {...props} />);

    const [selectedValue] = gameGrid;

    let Squares = getAllByTestId(`square-${selectedValue}`);

    Squares.forEach((Square) => {
      fireEvent.click(Square);
    });

    Squares = queryAllByTestId(`square-${selectedValue}`);
    const imgElements = getAllByAltText(`revealed-${selectedValue}-image`);
    const Score = getByText(`Score: ${POINTS}`);

    expect(Squares).toHaveLength(0);
    expect(imgElements).toHaveLength(2);
    expect(Score).toBeInTheDocument();
  });

  test('clicked two not matched items', async () => {
    const { getAllByTestId, queryByAltText,getByText } = render(<GameBoard {...props} />);

    const [selectedFirstValue, selectedSecondValue] = uniq(gameGrid);

    const [selectedFirstValueSquare] = getAllByTestId(
      `square-${selectedFirstValue}`
    );
    const [selectedSecondValueSquare] = getAllByTestId(
      `square-${selectedSecondValue}`
    );

    [selectedFirstValueSquare, selectedSecondValueSquare].forEach((Square) => {
      fireEvent.click(Square);
    });


    await waitFor(() => {
      const selectedFirstValueImage = queryByAltText(`revealed-${selectedFirstValue}-image`);
      const selectedSecondValueImage = queryByAltText(`revealed-${selectedSecondValue}-image`);
      const selectedFirstValueSquares = getAllByTestId(
        `square-${selectedFirstValue}`
      );
      const selectedSecondValueSquares = getAllByTestId(
        `square-${selectedSecondValue}`
      );
      const Score = getByText(`Score: 0`);

      expect(selectedFirstValueImage).toBeNull();
      expect(selectedSecondValueImage).toBeNull();
      expect(selectedFirstValueSquares).toHaveLength(2);
      expect(selectedSecondValueSquares).toHaveLength(2);
      expect(Score).toBeInTheDocument();
    })
  });
});
