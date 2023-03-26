import { useState, useEffect } from 'react';

import { useFetchActivities } from 'API/Queries/activity';
import ActivityMapper, {
  filterArchivedActivities,
} from 'Mappers/ActivityMapper';
import {
  filterActivitiesEnum,
  ActivityApiResource,
} from 'Models/ActitivityApiResource';
import { ActivityResource } from 'Models/ActivityResource';

const useGetActivities = (filter: filterActivitiesEnum) => {
  const [activities, setActivities] = useState<ActivityResource[]>([]);
  const [rawArchivedActivitiesList, setRawArchivedActivitiesList] = useState<
    ActivityApiResource[]
  >([]);
  const [rawUnarchivedActivitiesList, setRawUnarchivedActivitiesList] =
    useState<ActivityApiResource[]>([]);
  const [rawFullActivitiesList, setRawFullActivitiesList] = useState<
    ActivityApiResource[]
  >([]);

  const { data, isLoading, isError } = useFetchActivities();

  useEffect(() => {
    if (data) {
      setRawFullActivitiesList(data);
      if (filter === filterActivitiesEnum.all) {
        const activitiesFromServer = ActivityMapper(data);
        setActivities(activitiesFromServer);
      } else {
        const { archivedCalls, nonArchivedCalls } =
          filterArchivedActivities(data);
        setRawUnarchivedActivitiesList(nonArchivedCalls);
        setRawArchivedActivitiesList(archivedCalls);
        const activitiesFromServer = ActivityMapper(
          filter === filterActivitiesEnum.isArchived
            ? archivedCalls
            : nonArchivedCalls
        );
        setActivities(activitiesFromServer);
      }
    }
  }, [data, filter]);

  return {
    isLoading,
    isError,
    data: activities,
    rawArchivedActivitiesList,
    rawUnarchivedActivitiesList,
    rawFullActivitiesList,
  };
};

export default { useGetActivities };
