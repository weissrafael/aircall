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

export default function Inbox() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const {
    isLoading,
    isError,
    data: dataFromApi,
    rawUnarchivedActivitiesList,
  } = useActivities.useGetActivities(filterActivitiesEnum.nonArchived);

  const openConfirmationModal = () => {
    setModalIsOpen(true);
  };

  const queryClient = useQueryClient();

  const mutateArchiveAllActivity = useMutation(
    async () => {
      rawUnarchivedActivitiesList.forEach((activity) => {
        patchArchiveActivity(
          { is_archived: !activity.is_archived },
          activity.id
        );
      });
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries([QueryKeys.activityList]);
        setTimeout(() => {
          setModalIsOpen(false);
        }, 2000);
      },
    }
  );

  return (
    <>
      <PageHeader>
        <h1>Inbox</h1>
        <RoundButton onClick={openConfirmationModal}>
          Archive all
          <ArchiveIcon style={{ marginLeft: 8 }} />
        </RoundButton>
      </PageHeader>
      <Feed data={dataFromApi} />
      <ConfirmModal
        closeModal={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
        message={'Are you sure you want to archive all calls?'}
        onClick={mutateArchiveAllActivity.mutate}
        isLoading={mutateArchiveAllActivity.isLoading}
        isError={mutateArchiveAllActivity.isError}
        isSuccess={mutateArchiveAllActivity.isSuccess}
      />
    </>
  );
}
