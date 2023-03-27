import React from 'react';

import EmptyState from 'Components/EmptyState/EmptyState';
import Feed from 'Components/Feed/Feed';
import SkeletonFeed from 'Components/SkeletonFeed/Feed';
import useActivities from 'Hooks/useActivities';
import { FilterActivitiesEnum } from 'Models/ActitivityApiResource';
import { PageHeader } from 'Styles/common.styles';

function AllCalls() {
  const {
    isLoading,
    isError,
    data: dataFromApi,
  } = useActivities.useGetActivities(FilterActivitiesEnum.all);

  return (
    <>
      <PageHeader>
        <h1>All Calls</h1>
      </PageHeader>
      {isLoading && <SkeletonFeed />}
      {/*{isError && !isLoading && <ErrorState />}*/}
      {!isError && !isLoading && dataFromApi.length === 0 && <EmptyState />}
      {!isError && !isLoading && <Feed data={dataFromApi} disableArchive />}
    </>
  );
}

export default React.memo(AllCalls);
