import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import uniq from 'lodash/uniq';
import { Grid, GridProps } from './Grid';
import { generateGameGrid } from '../../generateGameGrid/generateGameGrid';

describe('<Grid>', () => {
  let props: GridProps;

  beforeEach(() => {
    props = {
      gameGrid: generateGameGrid(30),
      increaseScore: jest.fn()
    };
  });

  test('each value has two squares', () => {
    const { getAllByTestId } = render(<Grid {...props} />);

    props.gameGrid.forEach((value) => {
      const Squares = getAllByTestId(`square-${value}`);
      expect(Squares).toHaveLength(2);
    });
  });

  test('clicked one item', () => {
    const { getAllByTestId, getAllByAltText } = render(<Grid {...props} />);

    const [selectedValue] = props.gameGrid;

    const [Square] = getAllByTestId(`square-${selectedValue}`);

    fireEvent.click(Square);

    const Squares = getAllByTestId(`square-${selectedValue}`);
    const imgElements = getAllByAltText(`revealed-${selectedValue}-image`);

    expect(Squares).toHaveLength(1);
    expect(imgElements).toHaveLength(1);
    expect(props.increaseScore).not.toHaveBeenCalled();
  });

  test('clicked two matched items', () => {
    const { getAllByTestId, queryAllByTestId, getAllByAltText } = render(
      <Grid {...props} />
    );

    const [selectedValue] = props.gameGrid;

    let Squares = getAllByTestId(`square-${selectedValue}`);

    Squares.forEach((Square) => {
      fireEvent.click(Square);
    });

    Squares = queryAllByTestId(`square-${selectedValue}`);
    const imgElements = getAllByAltText(`revealed-${selectedValue}-image`);

    expect(Squares).toHaveLength(0);
    expect(imgElements).toHaveLength(2);
    expect(props.increaseScore).toHaveBeenCalled();
  });

  test('clicked two not matched items', async () => {
    const { getAllByTestId, queryByAltText } = render(<Grid {...props} />);

    const [selectedFirstValue, selectedSecondValue] = uniq(props.gameGrid);

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
      const selectedFirstValueImage = queryByAltText(
        `revealed-${selectedFirstValue}-image`
      );
      const selectedSecondValueImage = queryByAltText(
        `revealed-${selectedSecondValue}-image`
      );
      const selectedFirstValueSquares = getAllByTestId(
        `square-${selectedFirstValue}`
      );
      const selectedSecondValueSquares = getAllByTestId(
        `square-${selectedSecondValue}`
      );

      expect(selectedFirstValueImage).toBeNull();
      expect(selectedSecondValueImage).toBeNull();
      expect(selectedFirstValueSquares).toHaveLength(2);
      expect(selectedSecondValueSquares).toHaveLength(2);
      expect(props.increaseScore).not.toHaveBeenCalled();
    });
  });
});
