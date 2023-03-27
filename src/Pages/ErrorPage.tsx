import PublicIcon from '@mui/icons-material/Public';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import RoundButton from 'Components/RoundButton/RoundButton';
import { AWSIllustrationsUrl, IllustrationNames } from 'Constants/AWS';
import { ErrorHeader, ErrorImage, PageBody } from 'Styles/common.styles';

export default function ErrorPage() {
  const navigate = useNavigate();

  function refreshPage() {
    navigate('/', { replace: true, state: { refresh: true } });
    window.location.reload();
  }

  return (
    <PageBody>
      <ErrorHeader>Oops! Something went wrong.</ErrorHeader>
      <RoundButton onClick={refreshPage}>
        Go to home page <PublicIcon style={{ marginLeft: '0.6rem' }} />
      </RoundButton>
      <ErrorImage src={AWSIllustrationsUrl + IllustrationNames.error} />
    </PageBody>
  );
}
