import styled from 'styled-components';

import {
  borderRadius,
  colors,
  componentSize,
  scaleFactor,
  shadows,
  transitions,
} from 'Styles/styleGuide';

const { callButtonDiameter } = componentSize;

export const CallButtonContainer = styled.div`
  align-items: center;
  background-color: ${colors.positive};
  border-radius: ${borderRadius.fullCircle};
  box-shadow: ${shadows.shadowCenter10};
  cursor: pointer;
  display: flex;
  justify-content: center;
  min-height: ${callButtonDiameter}px;
  min-width: ${callButtonDiameter}px;
  position: relative;
  top: -10px;
  transition: ${transitions.easeInOut2s};
  &:hover {
    transform: scale(${scaleFactor.mainButton});
  }
`;
