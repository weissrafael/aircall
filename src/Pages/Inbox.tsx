import ArchiveIcon from '@mui/icons-material/Archive';
import React from 'react';

import ConfirmModal from 'Components/ConfirmModal/ConfirmModal';
import EmptyState from 'Components/EmptyState/EmptyState';
import Feed from 'Components/Feed/Feed';
import RoundButton from 'Components/RoundButton/RoundButton';
import SkeletonFeed from 'Components/SkeletonFeed/Feed';
import useActivities from 'Hooks/useActivities';
import useArchiveAll from 'Hooks/useArchiveAll';
import useModal from 'Hooks/useModal';
import {
  ArchiveType,
  FilterActivitiesEnum,
} from 'Models/ActitivityApiResource';
import { PageHeader } from 'Styles/common.styles';

function Inbox() {
  const { openConfirmationModal, closeConfirmationModal, modalIsOpen } =
    useModal.useModal();

  const {
    isLoading,
    isError,
    data: dataFromApi,
    isFetching,
  } = useActivities.useGetActivities(FilterActivitiesEnum.nonArchived);

  const {
    isLoading: mutateLoading,
    archiveAll,
    isSuccess,
  } = useArchiveAll.useArchiveAll(closeConfirmationModal, ArchiveType.archive);

  return (
    <>
      {!isError && !isLoading && !isFetching && dataFromApi.length > 0 && (
        <PageHeader>
          <h1>Inbox</h1>
          <RoundButton onClick={openConfirmationModal}>
            Archive all
            <ArchiveIcon style={{ marginLeft: 8 }} />
          </RoundButton>
        </PageHeader>
      )}
      {isFetching && <SkeletonFeed />}
      {/*{isError && !isLoading && <ErrorState />}*/}
      {!isError && !isLoading && dataFromApi.length === 0 && <EmptyState />}
      {!isError && !isLoading && <Feed data={dataFromApi} />}
      <ConfirmModal
        closeModal={closeConfirmationModal}
        isOpen={modalIsOpen}
        message={'Are you sure you want to archive all calls?'}
        onClick={archiveAll}
        isLoading={mutateLoading}
        isError={false}
        isSuccess={isSuccess}
      />
    </>
  );
}

export default React.memo(Inbox);
