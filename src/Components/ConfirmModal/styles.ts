import styled from 'styled-components';

import {
  borderRadius,
  colors,
  componentSize,
  fontWeights,
  spacing,
  text,
} from 'Styles/styleGuide';

const { contentBoxMaxWidth, actionsContainerHeight } = componentSize;

export const ModalContainer = styled.div`
  align-items: center;
  background-color: ${colors.transparent};
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const ActionsContainer = styled.div`
  align-items: center;
  display: flex;
  height: ${actionsContainerHeight}px;
  justify-content: space-between;
  width: 100%;
`;

export const ContentBox = styled.div`
  align-items: center;
  background-color: ${colors.white};
  border-radius: ${borderRadius.modal};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: ${contentBoxMaxWidth}px;
  padding: ${spacing.small} ${spacing.medium};
  text-align: center;
  width: 100%;
`;

export const ModalHeader = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${spacing.small};
  width: 100%;
`;

export const WarningInfo = styled.span`
  font-size: ${text.h2};
  font-weight: ${fontWeights.semiBold};
  text-align: left;
  width: 100%;
`;
