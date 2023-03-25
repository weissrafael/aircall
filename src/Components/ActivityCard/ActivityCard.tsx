import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import moment from 'moment';
import React, { useState } from 'react';

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
    id,
    isArchived,
    groupedCalls,
  } = activity;
  const [toBeArchived, setToBeArchived] = useState<boolean>(false);
  const [archived, setArchived] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);
  const callTypeIcon = getActivityCallTypeIcon(callType, direction);
  const numberOfGroupedCalls =
    groupedCalls.length > 0 ? groupedCalls.length : 0;
  const durationInfo =
    numberOfGroupedCalls > 0
      ? numberOfGroupedCalls + ' calls '
      : getDurationInfo(duration);
  const callTypeColor =
    callType === CallTypeEnum.voicemail
      ? colors.orange
      : callType === CallTypeEnum.missed
      ? colors.negative
      : colors.positive;

  const startArchiveAnimation = () => {
    setToBeArchived(true);
    setTimeout(() => {
      setArchived(true);
    }, 300);
  };

  const archiveActivity = (e: React.MouseEvent<HTMLButtonElement>) => {
    //stop propagation to prevent card from expanding
    e.stopPropagation();
    startArchiveAnimation();
  };

  return (
    <Card
      toBeArchived={toBeArchived}
      onClick={() => setExpand(!expand)}
      archived={archived}
      expand={expand}
      numberOfChildren={numberOfGroupedCalls || 0}
    >
      <VisibleContent>
        <ContactAvatar src={users[id]} />
        <ActivityInfo>
          <PhoneNumber>
            {direction === DirectionEnum.outbound ? from : to}
            {numberOfGroupedCalls && (
              <GroupedCallsBubble callTypeColor={callTypeColor}>
                {numberOfGroupedCalls}
              </GroupedCallsBubble>
            )}
          </PhoneNumber>
          <CallInfo>
            <CallType>{callTypeIcon}</CallType>
            {callType === CallTypeEnum.answered && (
              <CallDuration>
                {durationInfo} on {moment(activity.createdAt).format('MMM Do')}
              </CallDuration>
            )}
            {callType === CallTypeEnum.voicemail && (
              <CallDuration>
                left {numberOfGroupedCalls > 0 ? numberOfGroupedCalls : 'a'}{' '}
                voicemail{numberOfGroupedCalls > 0 ? 's' : ''} on{' '}
                {moment(activity.createdAt).format('MMM Do')}
              </CallDuration>
            )}
            {callType === CallTypeEnum.missed && (
              <CallDuration>
                {numberOfGroupedCalls > 0
                  ? numberOfGroupedCalls + ' calls'
                  : ''}{' '}
                missed on {moment(activity.createdAt).format('MMM Do')}
              </CallDuration>
            )}
          </CallInfo>
        </ActivityInfo>
        {!disableArchive && (
          <ArchiveButton onClick={(e) => archiveActivity(e)}>
            {isArchived ? (
              <UnarchiveIcon style={{ fontSize: '1.7rem' }} />
            ) : (
              <ArchiveIcon style={{ fontSize: '1.7rem' }} />
            )}
          </ArchiveButton>
        )}
      </VisibleContent>
      <ExpandableContent
        isOpen={expand}
        numberOfChildren={numberOfGroupedCalls || 0}
      >
        {groupedCalls.map((call) => {
          const { createdAt, id, duration } = call;
          const durationInfo = getDurationInfo(duration);
          return (
            <CallTime key={id}>
              at {moment(createdAt).format('hh:mm a')} • last for {durationInfo}
            </CallTime>
          );
        })}
      </ExpandableContent>
    </Card>
  );
}
