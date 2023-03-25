import UnarchiveIcon from '@mui/icons-material/Unarchive';
import React, { useState } from 'react';

import Feed from 'Components/Feed/Feed';

import ConfirmModal from '../Components/ConfirmModal/ConfirmModal';
import RoundButton from '../Components/RoundButton/RoundButton';
import { ActivityResource } from '../Models/ActivityResource';
import { PageHeader } from '../Styles/common.styles';

const data = [
  {
    id: 1,
    createdAt: '2018-01-01T00:00:00Z',
    direction: 'outbound',
    from: '998-765-4321',
    to: '998-123-4567',
    via: '998-123-4567',
    duration: 328,
    isArchived: false,
    callType: 'missed',
    groupedCalls: [
      {
        createdAt: '2018-01-01T00:03:02Z',
        duration: 328,
        id: 99,
      },
      {
        createdAt: '2018-01-01T00:20:32Z',
        duration: 128,
        id: 98,
      },
      {
        createdAt: '2018-01-01T01:34:32Z',
        duration: 398,
        id: 97,
      },
    ],
  },
  {
    id: 2,
    createdAt: '2018-01-01T00:00:00Z',
    direction: 'inbound',
    from: '998-765-4321',
    to: '998-123-4567',
    via: '998-123-4567',
    duration: 328,
    isArchived: false,
    callType: 'answered',
    groupedCalls: [],
  },
  {
    id: 7,
    createdAt: '2018-02-03T00:01:00Z',
    direction: 'inbound',
    from: '998-765-4321',
    to: '998-123-4567',
    via: '998-123-4567',
    duration: 109,
    isArchived: false,
    callType: 'answered',
    groupedCalls: [
      {
        createdAt: '2018-02-03T00:33:02Z',
        duration: 328,
        id: 19,
      },
      {
        createdAt: '2018-02-03T01:20:32Z',
        duration: 500,
        id: 18,
      },
      {
        createdAt: '2018-02-03T01:34:32Z',
        duration: 1200,
        id: 17,
      },
      {
        createdAt: '2018-02-03T01:44:32Z',
        duration: 990,
        id: 22,
      },
      {
        createdAt: '2018-02-03T02:34:32Z',
        duration: 20,
        id: 23,
      },
      {
        createdAt: '2018-02-03T04:00:32Z',
        duration: 101,
        id: 24,
      },
    ],
  },
  {
    id: 3,
    createdAt: '2018-01-01T00:30:00Z',
    direction: 'inbound',
    from: '998-123-4567',
    to: '998-123-3333',
    via: '998-123-4567',
    duration: 50,
    isArchived: false,
    callType: 'missed',
    groupedCalls: [],
  },
  {
    id: 4,
    createdAt: '2018-01-02T00:30:00Z',
    direction: 'inbound',
    from: '998-432-1778',
    to: '998-123-4567',
    via: '998-432-1778',
    duration: 301,
    isArchived: false,
    groupedCalls: [],
    callType: 'answered',
  },
  {
    id: 5,
    createdAt: '2018-04-03T00:30:00Z',
    direction: 'outbound',
    from: '998-123-8761',
    to: '998-123-4567',
    via: '998-123-4567',
    duration: 550,
    isArchived: false,
    callType: 'voicemail',
    groupedCalls: [
      {
        createdAt: '2018-04-03T00:33:02Z',
        duration: 328,
        id: 59,
      },
      {
        createdAt: '2018-02-03T01:20:32Z',
        duration: 500,
        id: 58,
      },
    ],
  },
  {
    id: 6,
    createdAt: '2018-01-03T00:30:00Z',
    direction: 'outbound',
    from: '998-123-4567',
    to: '998-123-3333',
    via: '998-123-4567',
    duration: 150,
    isArchived: false,
    callType: 'answered',
    groupedCalls: [],
  },
  {
    id: 8,
    createdAt: '2018-01-04T00:30:00Z',
    direction: 'outbound',
    from: '998-123-8761',
    to: '998-123-4567',
    via: '998-123-4567',
    duration: 550,
    isArchived: false,
    callType: 'voicemail',
    groupedCalls: [],
  },
] as ActivityResource[];

export default function Archived() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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
      <Feed data={data} />
      <ConfirmModal
        closeModal={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
        message="Are you sure you want to unarchive all calls?"
      />
    </>
  );
}
