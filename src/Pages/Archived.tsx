import UnarchiveIcon from '@mui/icons-material/Unarchive';
import React from 'react';

import ConfirmModal from 'Components/ConfirmModal/ConfirmModal';
import Feed from 'Components/Feed/Feed';
import RoundButton from 'Components/RoundButton/RoundButton';
import SkeletonFeed from 'Components/SkeletonFeed/Feed';
import useActivities from 'Hooks/useActivities';
import {
  ArchiveType,
  FilterActivitiesEnum,
} from 'Models/ActitivityApiResource';
import { PageHeader } from 'Styles/common.styles';

import EmptyState from '../Components/EmptyState/EmptyState';
import useArchiveAll from '../Hooks/useArchiveAll';
import useModal from '../Hooks/useModal';

function Archived() {
  const { openConfirmationModal, closeConfirmationModal, modalIsOpen } =
    useModal.useModal();

  const {
    isLoading,
    isError,
    data: dataFromApi,
  } = useActivities.useGetActivities(FilterActivitiesEnum.isArchived);

  const {
    isLoading: mutateLoading,
    archiveAll,
    isSuccess,
  } = useArchiveAll.useArchiveAll(
    closeConfirmationModal,
    ArchiveType.unarchive
  );

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
        closeModal={closeConfirmationModal}
        isOpen={modalIsOpen}
        message="Are you sure you want to unarchive all calls?"
        onClick={archiveAll}
        isLoading={mutateLoading}
        isError={false}
        isSuccess={isSuccess}
      />
    </>
  );
}

export default React.memo(Archived);
