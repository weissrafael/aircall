import { useState, useEffect } from 'react';

import { useFetchActivities } from 'API/Queries/activity';
import ActivityMapper, {
  filterArchivedActivities,
} from 'Mappers/ActivityMapper';
import { filterActivitiesEnum } from 'Models/ActitivityApiResource';
import { ActivityResource } from 'Models/ActivityResource';

const useGetActivities = (filter: filterActivitiesEnum) => {
  const [activities, setActivities] = useState<ActivityResource[]>([]);

  const { data, isLoading, isError } = useFetchActivities();

  useEffect(() => {
    if (data) {
      if (filter === filterActivitiesEnum.all) {
        const activitiesFromServer = ActivityMapper(data);
        setActivities(activitiesFromServer);
      } else {
        const { archivedCalls, nonArchivedCalls } =
          filterArchivedActivities(data);
        const activitiesFromServer = ActivityMapper(
          filter === filterActivitiesEnum.isArchived
            ? archivedCalls
            : nonArchivedCalls
        );
        setActivities(activitiesFromServer);
      }
    }
  }, [data, filter]);

  return { isLoading, isError, data: activities };
};

export default { useGetActivities };
