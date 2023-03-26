import ArchiveIcon from '@mui/icons-material/Archive';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import ConfirmModal from 'Components/ConfirmModal/ConfirmModal';
import Feed from 'Components/Feed/Feed';
import RoundButton from 'Components/RoundButton/RoundButton';
import useActivities from 'Hooks/useActivities';
import { filterActivitiesEnum } from 'Models/ActitivityApiResource';
import { PageHeader } from 'Styles/common.styles';

import { patchArchiveActivity } from '../API/Mutations/activity';
import { QueryKeys } from '../API/QueryKeys';
import SkeletonFeed from '../Components/SkeletonFeed/Feed';

export default function Inbox() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    isLoading,
    isError,
    data: dataFromApi,
    rawUnarchivedActivitiesList,
    refetch,
  } = useActivities.useGetActivities(filterActivitiesEnum.nonArchived);

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
    await rawUnarchivedActivitiesList.forEach((activity) => {
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
      setModalIsOpen(false);
    }, 1300);
  };

  return (
    <>
      <PageHeader>
        <h1>Inbox</h1>
        <RoundButton onClick={openConfirmationModal}>
          Archive all
          <ArchiveIcon style={{ marginLeft: 8 }} />
        </RoundButton>
      </PageHeader>
      {isLoading && <SkeletonFeed />}
      {/*{isError && !isLoading && <ErrorState />}*/}
      {/*{!isError && !isLoading && dataFromApi.length === 0 && <EmptyState />}*/}
      {!isError && !isLoading && <Feed data={dataFromApi} />}
      <ConfirmModal
        closeModal={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
        message={'Are you sure you want to archive all calls?'}
        onClick={archiveAll}
        isLoading={loading}
        isError={false}
        isSuccess={isSuccess}
      />
    </>
  );
}
