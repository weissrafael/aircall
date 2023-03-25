import { Skeleton } from '@mui/material';
import React from 'react';

import { text } from 'Styles/styleGuide';

import { EmptyCard, SkeletonTextContainer } from './styles';

export default function CardSkeletonLoader() {
  return (
    <EmptyCard>
      <Skeleton animation="wave" variant="circular" width={60} height={60} />
      <SkeletonTextContainer>
        <Skeleton
          variant="text"
          animation="wave"
          width="150px"
          sx={{ fontSize: text.h2, marginLeft: 2 }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width="200px"
          sx={{ fontSize: text.smallBody, marginLeft: 2 }}
        />
      </SkeletonTextContainer>
    </EmptyCard>
  );
}
