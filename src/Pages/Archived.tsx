import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { patchArchiveActivity } from 'API/Mutations/activity';
import { QueryKeys } from 'API/QueryKeys';
import ConfirmModal from 'Components/ConfirmModal/ConfirmModal';
import Feed from 'Components/Feed/Feed';
import RoundButton from 'Components/RoundButton/RoundButton';
import SkeletonFeed from 'Components/SkeletonFeed/Feed';
import useActivities from 'Hooks/useActivities';
import { filterActivitiesEnum } from 'Models/ActitivityApiResource';
import { PageHeader } from 'Styles/common.styles';

import EmptyState from '../Components/EmptyState/EmptyState';

function Archived() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    isLoading,
    isError,
    data: dataFromApi,
    rawArchivedActivitiesList,
    refetch,
  } = useActivities.useGetActivities(filterActivitiesEnum.isArchived);

  const openConfirmationModal = () => {
    setModalIsOpen(true);
  };
  const queryClient = useQueryClient();

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
    await rawArchivedActivitiesList.forEach((activity) => {
      mutateArchiveActivity.mutate({
        isArchived: activity.is_archived,
        id: activity.id,
      });
    });
    await queryClient.invalidateQueries([QueryKeys.activityList]);
    await refetch();
    mutateArchiveActivity.reset();
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setModalIsOpen(false);
    }, 1300);
  };

  return (
    <>
      {!isError && !isLoading && dataFromApi.length > 0 && (
        <PageHeader>
          <h1>Archived</h1>
          <RoundButton onClick={openConfirmationModal}>
            Unarchive All
            <UnarchiveIcon style={{ marginLeft: 8 }} />
          </RoundButton>
        </PageHeader>
      )}
      {!isError && !isLoading && dataFromApi.length === 0 && <EmptyState />}
      {isLoading && <SkeletonFeed />}
      {/*{isError && !isLoading && <ErrorState />}*/}
      {!isError && !isLoading && <Feed data={dataFromApi} />}
      <ConfirmModal
        closeModal={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
        message="Are you sure you want to unarchive all calls?"
        onClick={archiveAll}
        isLoading={loading}
        isError={false}
        isSuccess={isSuccess}
      />
    </>
  );
}

export default React.memo(Archived);
