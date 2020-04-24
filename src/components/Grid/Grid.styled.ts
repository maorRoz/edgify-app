import styled from 'styled-components';

export const GridLayout = styled.div`
  display: grid;
  margin: 0;
  grid-gap: 1vmin;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, 12vh);
`;
