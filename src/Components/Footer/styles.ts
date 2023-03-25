import styled from 'styled-components';

import { TabButton } from 'Styles/common.styles';
import {
  borderRadius,
  colors,
  componentSize,
  fontWeights,
  iconSize,
  layerOrder,
  screens,
  shadows,
  spacing,
  text,
} from 'Styles/styleGuide';

const { footerHeight, notificationBubbleSize } = componentSize;

export const FooterContainer = styled.div`
  align-items: center;
  background-color: ${colors.white};
  bottom: 0;
  box-shadow: ${shadows.shadowTop8};
  display: flex;
  flex-direction: row;
  height: ${footerHeight}px;
  justify-content: center;
  padding: 0 ${spacing.small};
  position: fixed;
  width: 100%;
  z-index: ${layerOrder.levelOne};
`;

export const LeftActions = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
  padding-left: ${spacing.xxSmall};
  width: 100%;
  @media (min-width: ${screens.small}px) {
    justify-content: flex-end;
  }
`;

export const RightActions = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  padding-right: ${spacing.xxSmall};
  width: 100%;
  @media (min-width: ${screens.small}px) {
    justify-content: flex-start;
  }
`;

export const NotificationBubble = styled.div`
  align-items: center;
  background-color: ${colors.positive};
  border-radius: ${borderRadius.fullCircle};
  color: ${colors.white};
  display: flex;
  font-size: ${text.notification};
  font-weight: ${fontWeights.bold};
  height: ${notificationBubbleSize}px;
  justify-content: center;
  position: absolute;
  right: 8px;
  top: 9px;
  width: ${notificationBubbleSize}px;
  @media (min-width: ${screens.medium}px) {
    right: 4px;
  }
`;

export const TabRightButton = styled(TabButton)`
  margin-left: ${spacing.small};
  margin-right: 0;
  @media (min-width: ${screens.medium}px) {
    margin-left: ${spacing.medium};
    svg {
      font-size: ${iconSize.tabIconDesktop};
    }
  }
`;
