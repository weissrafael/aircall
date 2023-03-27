import { useState, useEffect } from 'react';

import { useFetchActivities } from 'API/Queries/activity';
import ActivityMapper, {
  filterArchivedActivities,
} from 'Mappers/ActivityMapper';
import {
  FilterActivitiesEnum,
  ActivityApiResource,
} from 'Models/ActitivityApiResource';
import { ActivityResource } from 'Models/ActivityResource';

const useGetActivities = (filter: FilterActivitiesEnum) => {
  const [activities, setActivities] = useState<ActivityResource[]>([]);
  const [rawArchivedActivitiesList, setRawArchivedActivitiesList] = useState<
    ActivityApiResource[]
  >([]);
  const [rawUnarchivedActivitiesList, setRawUnarchivedActivitiesList] =
    useState<ActivityApiResource[]>([]);
  const [rawFullActivitiesList, setRawFullActivitiesList] = useState<
    ActivityApiResource[]
  >([]);

  const { data, isLoading, isError, refetch } = useFetchActivities();

  useEffect(() => {
    if (data) {
      setRawFullActivitiesList(data);
      if (filter === FilterActivitiesEnum.all) {
        const activitiesFromServer = ActivityMapper(data);
        setActivities(activitiesFromServer);
      } else {
        const { archivedCalls, nonArchivedCalls } =
          filterArchivedActivities(data);
        setRawUnarchivedActivitiesList(nonArchivedCalls);
        setRawArchivedActivitiesList(archivedCalls);
        const activitiesFromServer = ActivityMapper(
          filter === FilterActivitiesEnum.isArchived
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
    refetch,
  };
};

export default { useGetActivities };
