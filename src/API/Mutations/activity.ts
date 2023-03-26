import { useMutation } from '@tanstack/react-query';

import { axiosRequest } from 'API/axiosInstance';
import { QueryKeys } from 'API/QueryKeys';
import { ActivityResource } from 'Models/ActivityResource';

export const useArchiveActivity = () => {
  return useMutation([QueryKeys.activityList], async () => {
    const response = await axiosRequest.patch<ActivityResource[]>(
      `/activities`
    );
    return response.data;
  });
};

// export const patchArchiveActivity = async (
//   request: PatchArchiveActivityRequest
// ) => {
//   const response = await axiosRequest.post<TrainingWorkoutGroupsResource>(
//     '/training-workout-groups',
//     request
//   );
//   return response.data;
// };
