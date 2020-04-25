import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Card, CardProps } from './Card';
import { Fakes } from '../../test-utils/Fakes';

describe('<Card>', () => {
  let props: CardProps;

  beforeEach(() => {
    props = {
      value: Fakes.number(),
      onSelect: jest.fn(),
      revealed: Fakes.booleanOptional()
    };
  });

  describe('not revealed', () => {
    beforeEach(() => {
      props.revealed = false;
    });

    test('Square rendered', () => {
      const { getByTestId } = render(<Card {...props} />);

      const Square = getByTestId(`square-${props.value}`);

      expect(Square).toBeInTheDocument();
    });

    test('square rendered', () => {
      const { getByTestId } = render(<Card {...props} />);

      const squareElement = getByTestId(`square-${props.value}`);
      fireEvent.click(squareElement);

      expect(props.onSelect).toHaveBeenCalled();
    });
  });

  describe('revealed', () => {
    beforeEach(() => {
      props.revealed = true;
    });

    test('RevealedCardLayout rendered', () => {
      const { getByTestId } = render(<Card {...props} />);

      const RevealedCardLayout = getByTestId(`revealed-${props.value}`);

      expect(RevealedCardLayout).toBeInTheDocument();
    });

    test('img rendered', () => {
      const { getByAltText } = render(<Card {...props} />);

      const imgElement = getByAltText(`revealed-${props.value}`);

      expect(imgElement).toBeInTheDocument();
    });
  });
});
