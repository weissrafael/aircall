import ContactsIcon from '@mui/icons-material/Contacts';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Person2Icon from '@mui/icons-material/Person2';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';

import CallButton from 'Components/CallButton/CallButton';
import { ScreenLimiter, TabButton } from 'Styles/common.styles';

import {
  TabRightButton,
  FooterContainer,
  LeftActions,
  NotificationBubble,
  RightActions,
} from './styles';

const Footer = () => {
  const mockNumberOfCalls = 7;

  return (
    <footer>
      <FooterContainer>
        <ScreenLimiter>
          <LeftActions>
            <TabButton to="/" $active={true}>
              <LocalPhoneIcon />
              <NotificationBubble>{mockNumberOfCalls}</NotificationBubble>
            </TabButton>
            <TabButton to="/">
              <Person2Icon />
            </TabButton>
          </LeftActions>
          <CallButton />
          <RightActions>
            <TabRightButton to="/">
              <ContactsIcon />
            </TabRightButton>
            <TabRightButton to="/">
              <SettingsIcon />
            </TabRightButton>
          </RightActions>
        </ScreenLimiter>
      </FooterContainer>
    </footer>
  );
};

export default Footer;
