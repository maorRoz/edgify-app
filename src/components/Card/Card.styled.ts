import styled from 'styled-components';

export const Square = styled.div`
  cursor: pointer;
  justify-self: stretch;
  border-radius: 5px;
  background-color: purple;
`;

export const RevealedCardLayout = styled.div`
  justify-self: stretch;
  border-radius: 5px;
  overflow: hidden;
  transition: 2s;

  img {
    max-width: 100%;
  }
`;
