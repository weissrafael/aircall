import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import React, { useState } from 'react';

import { patchArchiveActivity } from 'API/Mutations/activity';
import user1 from 'Assets/Images/mock-user-avatars/user1.png';
import user10 from 'Assets/Images/mock-user-avatars/user10.png';
import user11 from 'Assets/Images/mock-user-avatars/user11.png';
import user2 from 'Assets/Images/mock-user-avatars/user2.png';
import user3 from 'Assets/Images/mock-user-avatars/user3.png';
import user4 from 'Assets/Images/mock-user-avatars/user4.png';
import user5 from 'Assets/Images/mock-user-avatars/user5.png';
import user6 from 'Assets/Images/mock-user-avatars/user6.png';
import user7 from 'Assets/Images/mock-user-avatars/user7.png';
import user8 from 'Assets/Images/mock-user-avatars/user8.png';
import user9 from 'Assets/Images/mock-user-avatars/user9.png';
import {
  ActivityResource,
  CallTypeEnum,
  DirectionEnum,
} from 'Models/ActivityResource';
import { StyledCircularProgress } from 'Styles/common.styles';
import { colors } from 'Styles/styleGuide';
import { getActivityCallTypeIcon, getDurationInfo } from 'Utils/activity';

import {
  Card,
  ContactAvatar,
  PhoneNumber,
  CallType,
  CallInfo,
  CallDuration,
  ActivityInfo,
  ArchiveButton,
  GroupedCallsBubble,
  VisibleContent,
  ExpandableContent,
  CallTime,
  ErrorContainer,
  ErrorMessage,
  StyledErrorIcon,
} from './styles';

interface Props {
  activity: ActivityResource;
  disableArchive?: boolean;
}

const users = [
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
  user9,
  user10,
  user11,
];

export default function ActivityCard({ activity, disableArchive }: Props) {
  const {
    direction,
    from,
    to,
    duration,
    callType,
    isArchived,
    groupedCalls,
    avatarUrl,
    createdAt,
    id,
  } = activity;
  const [toBeArchived, setToBeArchived] = useState<boolean>(false);
  const [archived, setArchived] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const callTypeIcon = getActivityCallTypeIcon(direction, callType);
  const numberOfGroupedCalls =
    groupedCalls.length > 0 ? groupedCalls.length : 1;
  const durationInfo =
    numberOfGroupedCalls > 1
      ? numberOfGroupedCalls + ' calls '
      : getDurationInfo(duration);
  const callTypeColor = !callType
    ? colors.gray7
    : callType === CallTypeEnum.voicemail
    ? colors.orange
    : callType === CallTypeEnum.missed
    ? colors.negative
    : colors.positive;

  const showArchiveError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  const startArchiveAnimation = () => {
    setToBeArchived(true);
    setTimeout(() => {
      setArchived(true);
    }, 300);
  };

  const archiveActivity = (e: React.MouseEvent<HTMLButtonElement>) => {
    //stop propagation to prevent card from expanding
    e.stopPropagation();
    if (groupedCalls.length > 0) {
      groupedCalls.forEach((call) => {
        mutateArchiveActivity.mutate({
          isArchived: call.isArchived,
          id: call.id,
        });
      });
    }
    mutateArchiveActivity.mutate({ isArchived, id });
  };
  const formattedDate = moment(createdAt).format('MMM Do');

  interface Props {
    isArchived: boolean;
    id: string;
  }

  const mutateArchiveActivity = useMutation(
    async ({ isArchived, id }: Props) => {
      await patchArchiveActivity({ is_archived: !isArchived }, id);
    },
    {
      onSuccess: () => {
        startArchiveAnimation();
      },
      onError: () => {
        showArchiveError();
      },
    }
  );

  return (
    <Card
      toBeArchived={toBeArchived}
      onClick={() => setExpand(!expand)}
      archived={archived}
      expand={expand}
      numberOfChildren={numberOfGroupedCalls || 1}
    >
      <VisibleContent>
        <ContactAvatar src={users[avatarUrl]} />
        <ActivityInfo>
          <PhoneNumber>
            {direction === DirectionEnum.outbound
              ? from || 'Unknown'
              : to || 'Unknown'}
            {numberOfGroupedCalls > 1 && (
              <GroupedCallsBubble callTypeColor={callTypeColor}>
                {numberOfGroupedCalls}
              </GroupedCallsBubble>
            )}
          </PhoneNumber>
          <CallInfo>
            <CallType>{callTypeIcon}</CallType>
            {!callType && (
              <CallDuration>
                {durationInfo}
                {createdAt && 'on ' + formattedDate}
              </CallDuration>
            )}
            {callType === CallTypeEnum.answered && (
              <CallDuration>
                {durationInfo} on {formattedDate}
              </CallDuration>
            )}
            {callType === CallTypeEnum.voicemail && (
              <CallDuration>
                left {numberOfGroupedCalls > 1 ? numberOfGroupedCalls : 'a'}{' '}
                voicemail{numberOfGroupedCalls > 1 ? 's' : ''} on{' '}
                {formattedDate}
              </CallDuration>
            )}
            {callType === CallTypeEnum.missed && (
              <CallDuration>
                {numberOfGroupedCalls > 1
                  ? numberOfGroupedCalls + ' calls'
                  : ''}{' '}
                missed on {formattedDate}
              </CallDuration>
            )}
          </CallInfo>
        </ActivityInfo>
        {mutateArchiveActivity.isLoading && <StyledCircularProgress />}
        {!error && !mutateArchiveActivity.isLoading && !disableArchive && (
          <ArchiveButton onClick={(e) => archiveActivity(e)}>
            {isArchived ? (
              <UnarchiveIcon style={{ fontSize: '1.7rem' }} />
            ) : (
              <ArchiveIcon style={{ fontSize: '1.7rem' }} />
            )}
          </ArchiveButton>
        )}
        {error && !mutateArchiveActivity.isLoading && (
          <ErrorContainer>
            <ErrorMessage>Something went wrong</ErrorMessage>
            <StyledErrorIcon />
          </ErrorContainer>
        )}
      </VisibleContent>
      <ExpandableContent
        isOpen={expand}
        numberOfChildren={numberOfGroupedCalls || 1}
      >
        {numberOfGroupedCalls > 1 ? (
          groupedCalls.map((call) => {
            const { createdAt, id, duration } = call;
            const durationInfo = getDurationInfo(duration);
            return (
              <CallTime key={id}>
                at {moment(createdAt).format('hh:mm a')}
                {durationInfo !== ' - ' && ' for ' + durationInfo}
              </CallTime>
            );
          })
        ) : (
          <CallTime>at {moment(createdAt).format('hh:mm a')}</CallTime>
        )}
      </ExpandableContent>
    </Card>
  );
}
