import React from 'react';

import { ActivitiesList } from 'Components/Feed/styles';

import CardSkeletonLoader from '../CardSkeletonLoader/CardSkeletonLoader';

//create empty array of 10 items
const skeletonArray = Array.from(Array(10).keys());

export default function SkeletonFeed() {
  return (
    <ActivitiesList>
      {skeletonArray.map((item) => (
        <CardSkeletonLoader key={item} />
      ))}
    </ActivitiesList>
  );
}
