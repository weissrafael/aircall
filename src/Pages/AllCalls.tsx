import React from 'react';

import Feed from 'Components/Feed/Feed';
import useActivities from 'Hooks/useActivities';
import { filterActivitiesEnum } from 'Models/ActitivityApiResource';
import { PageHeader } from 'Styles/common.styles';

function AllCalls() {
  const {
    isLoading,
    isError,
    data: dataFromApi,
  } = useActivities.useGetActivities(filterActivitiesEnum.all);

  return (
    <>
      <PageHeader>
        <h1>All Calls</h1>
      </PageHeader>
      <Feed data={dataFromApi} disableArchive />
    </>
  );
}

export default React.memo(AllCalls);
