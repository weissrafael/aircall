import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import React from 'react';

import { colors } from 'Styles/styleGuide';

import { CallButtonContainer } from './styles';

export default function CallButton() {
  return (
    <CallButtonContainer>
      <PhoneInTalkIcon style={{ color: colors.white, fontSize: '2rem' }} />
    </CallButtonContainer>
  );
}
