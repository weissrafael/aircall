import React from 'react';

import errorImg from 'Assets/Images/error.svg';
import { ErrorHeader, ErrorImage, PageBody } from 'Styles/common.styles';

export default function EmptyState() {
  return (
    <PageBody>
      <ErrorHeader>Oops! Something went wrong</ErrorHeader>
      <ErrorImage src={errorImg} />
    </PageBody>
  );
}
