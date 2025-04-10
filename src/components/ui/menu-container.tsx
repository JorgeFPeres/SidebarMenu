import { styled } from "styled-components";

export const MenuContainer = styled.div<{ collapsed: boolean }>`
  background-color: #01001e;
  color: white;
  height: 100vh;
  width: ${({ collapsed }) => collapsed ? '80px' : '240px'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
