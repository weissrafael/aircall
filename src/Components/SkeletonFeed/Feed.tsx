import React from 'react';

import CardSkeletonLoader from 'Components/CardSkeletonLoader/CardSkeletonLoader';
import { ActivitiesList } from 'Components/Feed/styles';
import { PageHeader } from 'Styles/common.styles';

const skeletonArray = Array.from(Array(10).keys());

export default function SkeletonFeed() {
  return (
    <>
      <PageHeader>
        <h1>Loading...</h1>
      </PageHeader>
      <ActivitiesList>
        {skeletonArray.map((item) => (
          <CardSkeletonLoader key={item} />
        ))}
      </ActivitiesList>
    </>
  );
}
