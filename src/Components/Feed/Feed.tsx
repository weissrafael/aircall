import React from 'react';

import ActivityCard from 'Components/ActivityCard/ActivityCard';
import { ActivityResource } from 'Models/ActivityResource';

import { ActivitiesList } from './styles';

interface Props {
  data: ActivityResource[];
  disableArchive?: boolean;
}

export default function Feed({ data, disableArchive }: Props) {
  return (
    <ActivitiesList>
      {data.map((item) => (
        <ActivityCard
          key={item.id}
          activity={item}
          disableArchive={disableArchive}
        />
      ))}
    </ActivitiesList>
  );
}
