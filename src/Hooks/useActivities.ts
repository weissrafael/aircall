import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import Api from 'API';

import ActivityMapper from '../Mappers/ActivityMapper';
import { ActivityResource } from '../Models/ActivityResource';

const api = new Api();

const useGetActivities = () => {
  const [activities, setActivities] = useState<ActivityResource[]>([]);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['activities'],
    queryFn: () => api.getActivities(),
  });

  useEffect(() => {
    if (data) {
      const activitiesFromServer = ActivityMapper(data.data);
      setActivities(activitiesFromServer);
    }
  }, [data]);

  return { isLoading, error, data: activities, isFetching };
};

// const useArchiveActivity = () => {
//   const mutation = useMutation({
//     queryKey: ['activities'],
//     queryFn: () => api.getActivities(),
//   });
//   return;
// };

export default { useGetActivities };
