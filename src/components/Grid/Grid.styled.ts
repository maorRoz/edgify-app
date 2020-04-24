import styled from 'styled-components';

export const GridLayout = styled.div`
  display: grid;
  margin: 0;
  width: 40%;
  height: 100%;
  grid-gap: 1vmin;
  grid-template-columns: repeat(6, 120px);
  grid-template-rows: repeat(5, 100px);
`;
