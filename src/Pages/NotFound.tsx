import PublicIcon from '@mui/icons-material/Public';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import errorImgSrc from 'Assets/Images/error.svg';
import RoundButton from 'Components/RoundButton/RoundButton';
import { ErrorHeader, ErrorImage, PageBody } from 'Styles/common.styles';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <PageBody>
      <ErrorHeader>Nothing to see here!</ErrorHeader>
      <RoundButton onClick={() => navigate('/')}>
        Go to home page <PublicIcon style={{ marginLeft: '0.6rem' }} />
      </RoundButton>
      <ErrorImage src={errorImgSrc} />
    </PageBody>
  );
}
