import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { patchArchiveActivity } from 'API/Mutations/activity';
import { QueryKeys } from 'API/QueryKeys';
import useActivities from 'Hooks/useActivities';
import {
  ArchiveType,
  FilterActivitiesEnum,
} from 'Models/ActitivityApiResource';

const useArchiveAll = (
  closeConfirmationModal: () => void,
  archiveType: ArchiveType
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { rawUnarchivedActivitiesList, rawArchivedActivitiesList, refetch } =
    useActivities.useGetActivities(FilterActivitiesEnum.nonArchived);

  interface Props {
    isArchived: boolean;
    id: string;
  }

  const mutateArchiveActivity = useMutation(
    async ({ isArchived, id }: Props) => {
      await patchArchiveActivity({ is_archived: !isArchived }, id);
    }
  );

  const archiveAll = async () => {
    setIsLoading(true);
    const listToArchive =
      archiveType === ArchiveType.archive
        ? rawUnarchivedActivitiesList
        : rawArchivedActivitiesList;
    await listToArchive.forEach((activity) => {
      mutateArchiveActivity.mutate({
        isArchived: activity.is_archived,
        id: activity.id,
      });
    });
    await queryClient.invalidateQueries([QueryKeys.activityList]);
    await refetch();
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      closeConfirmationModal();
    }, 1300);
  };

  return {
    isLoading,
    isSuccess,
    archiveAll,
  };
};

export default { useArchiveAll };
