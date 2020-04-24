import styled from 'styled-components'

export const GridLayout = styled.div`
  display: grid;
  margin: 0;
  width: 40%;
  grid-gap: 1vmin;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
`
