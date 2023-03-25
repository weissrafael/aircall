import styled from 'styled-components';

import {
  borderRadius,
  colors,
  componentSize,
  shadows,
  spacing,
  transitions,
} from 'Styles/styleGuide';

const { cardHeight } = componentSize;

export const EmptyCard = styled.div`
  align-items: center;
  background-color: ${colors.white};
  border-radius: ${borderRadius.card};
  box-shadow: ${shadows.shadowCenter8};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: ${cardHeight}px;
  margin-bottom: ${spacing.small};
  padding: ${spacing.xSmall};
  position: relative;
  right: 0;
  transition: ${transitions.easeInOut3s};
  width: 100%;
`;

export const SkeletonTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  width: 100%;
`;
