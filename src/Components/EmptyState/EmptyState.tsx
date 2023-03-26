import React from 'react';

import { ErrorHeader, ErrorImage, PageBody } from 'Styles/common.styles';

import { AWSIllustrationsUrl, IllustrationNames } from '../../Constants/AWS';

export default function EmptyState() {
  return (
    <PageBody>
      <ErrorHeader>No calls here!</ErrorHeader>
      <ErrorImage src={AWSIllustrationsUrl + IllustrationNames.archiveEmpty} />
    </PageBody>
  );
}
