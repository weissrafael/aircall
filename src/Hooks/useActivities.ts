import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import Api from 'API';

import ActivityMapper, {
  filterArchivedActivities,
} from '../Mappers/ActivityMapper';
import { filterActivitiesEnum } from '../Models/ActitivityApiResource';
import { ActivityResource } from '../Models/ActivityResource';

const api = new Api();

const useGetActivities = (filter: filterActivitiesEnum) => {
  const [activities, setActivities] = useState<ActivityResource[]>([]);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['activities'],
    queryFn: () => api.getActivities(),
  });

  useEffect(() => {
    if (data) {
      if (filter === filterActivitiesEnum.all) {
        const activitiesFromServer = ActivityMapper(data.data);
        setActivities(activitiesFromServer);
      } else {
        const { archivedCalls, nonArchivedCalls } = filterArchivedActivities(
          data.data
        );
        const activitiesFromServer = ActivityMapper(
          filter === filterActivitiesEnum.isArchived
            ? archivedCalls
            : nonArchivedCalls
        );
        setActivities(activitiesFromServer);
      }
    }
  }, [data, filter]);

  return { isLoading, error, data: activities, isFetching };
};

export default { useGetActivities };
