import { useQuery } from '@tanstack/react-query';

import { axiosRequest } from 'API/axiosInstance';
import { QueryKeys } from 'API/QueryKeys';
import { ActivityApiResource } from 'Models/ActitivityApiResource';

export const useFetchActivities = () => {
  return useQuery(
    [QueryKeys.activityList],
    async () => {
      const response = await axiosRequest.get<ActivityApiResource[]>(
        `/activities`
      );
      return response.data;
    },
    {
      enabled: true,
    }
  );
};
