import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

import Feed from 'Components/Feed/Feed';

import { patchArchiveActivity } from '../API/Mutations/activity';
import ConfirmModal from '../Components/ConfirmModal/ConfirmModal';
import RoundButton from '../Components/RoundButton/RoundButton';
import useActivities from '../Hooks/useActivities';
import { filterActivitiesEnum } from '../Models/ActitivityApiResource';
import { PageHeader } from '../Styles/common.styles';

export default function Archived() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const {
    isLoading,
    isError,
    data: dataFromApi,
    rawArchivedActivitiesList,
  } = useActivities.useGetActivities(filterActivitiesEnum.isArchived);

  const openConfirmationModal = () => {
    setModalIsOpen(true);
  };

  const mutateUnarchiveAllActivity = useMutation(async () => {
    rawArchivedActivitiesList.forEach((activity) => {
      patchArchiveActivity({ is_archived: !activity.is_archived }, activity.id);
    });
  });

  return (
    <>
      <PageHeader>
        <h1>Archived</h1>
        <RoundButton onClick={openConfirmationModal}>
          Unarchive All
          <UnarchiveIcon style={{ marginLeft: 8 }} />
        </RoundButton>
      </PageHeader>
      <Feed data={dataFromApi} />
      <ConfirmModal
        closeModal={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
        message="Are you sure you want to unarchive all calls?"
        onClick={mutateUnarchiveAllActivity.mutate}
      />
    </>
  );
}
