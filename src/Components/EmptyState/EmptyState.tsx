import React from 'react';

import emptyImg from 'Assets/Images/archive-empty.svg';
import { ErrorHeader, ErrorImage, PageBody } from 'Styles/common.styles';

export default function EmptyState() {
  return (
    <PageBody>
      <ErrorHeader>No calls here!</ErrorHeader>
      <ErrorImage src={emptyImg} />
    </PageBody>
  );
}
