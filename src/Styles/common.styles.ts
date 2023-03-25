import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { colors, screens, spacing } from './styleGuide';

export const PageBody = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px ${spacing.small};
  @media (min-width: ${screens.medium}px) {
    padding: 80px 0 0 0;
    max-width: 700px;
    margin: auto;
  }
`;

export const PageHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${spacing.xxSmall};
  padding-left: ${spacing.xxSmall};
  width: 100%;
`;

export const ErrorHeader = styled(PageHeader)`
  align-items: center;
  font-size: 1.8rem;
  justify-content: center;
  margin-bottom: ${spacing.large};
`;

export const ScreenLimiter = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  max-width: 700px;
  width: 100%;
`;

export const ErrorImage = styled.img`
  margin-top: ${spacing.large};
  width: 18rem;
`;

interface TabButtonProps {
  active?: boolean;
}

export const TabButton = styled(Link)<TabButtonProps>`
  align-items: center;
  background-color: transparent;
  border: none;
  border-top: 3px solid
    ${(props) => (props.active ? colors.positive : colors.transparent)};
  color: ${colors.gray10};
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  margin-right: ${spacing.small};
  padding: ${spacing.small};
  position: relative;
  transition: border-color 0.3s ease-in-out;
  width: 50px;
  svg {
    font-size: 1.8rem;
  }
  &:hover {
    border-color: ${colors.positive};
  }
  @media (min-width: ${screens.small}px) {
    margin-right: ${spacing.medium};
    svg {
      font-size: 2rem;
    }
  }
`;
