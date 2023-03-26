import ArchiveIcon from '@mui/icons-material/Archive';
import React, { useState } from 'react';

import ConfirmModal from 'Components/ConfirmModal/ConfirmModal';
import Feed from 'Components/Feed/Feed';
import RoundButton from 'Components/RoundButton/RoundButton';
import useActivities from 'Hooks/useActivities';
import { filterActivitiesEnum } from 'Models/ActitivityApiResource';
import { PageHeader } from 'Styles/common.styles';

export default function Inbox() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const {
    isLoading,
    error,
    data: dataFromApi,
    isFetching,
  } = useActivities.useGetActivities(filterActivitiesEnum.nonArchived);

  const openConfirmationModal = () => {
    setModalIsOpen(true);
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
      <Feed data={dataFromApi} />
      <ConfirmModal
        closeModal={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
        message={'Are you sure you want to archive all calls?'}
      />
    </>
  );
}
