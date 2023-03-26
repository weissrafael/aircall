import { axiosRequest } from 'API/axiosInstance';

export interface ArchiveActivityRequest {
  is_archived: boolean;
}

export const patchArchiveActivity = async (
  request: ArchiveActivityRequest,
  id: string
) => {
  const response = await axiosRequest.patch<string>(
    `/activities/${id}`,
    request
  );
  return response.data;
};
