import { axiosRequest } from 'API/axiosInstance';
import { ActivityResource } from 'Models/ActivityResource';

export interface ArchiveActivityRequest {
  is_archived: boolean;
}

export const patchArchiveActivity = async (
  request: ArchiveActivityRequest,
  id: string
) => {
  const response = await axiosRequest.patch<ActivityResource[]>(
    `/activities/${id}`,
    request
  );
  return response.data;
};
