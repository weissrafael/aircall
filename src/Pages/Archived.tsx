import UnarchiveIcon from '@mui/icons-material/Unarchive';
import React, { useState } from 'react';

import Feed from 'Components/Feed/Feed';

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
  } = useActivities.useGetActivities(filterActivitiesEnum.isArchived);

  const openConfirmationModal = () => {
    setModalIsOpen(true);
  };

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
      />
    </>
  );
}
