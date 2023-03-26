import CallMadeIcon from '@mui/icons-material/CallMade';
import CallMissedIcon from '@mui/icons-material/CallMissed';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import React from 'react';

import { CallTypeEnum, DirectionEnum } from 'Models/ActivityResource';

import { colors } from '../Styles/styleGuide';

export function getActivityCallTypeIcon(
  direction?: DirectionEnum,
  callType?: CallTypeEnum
): React.ReactElement {
  let callTypeIcon = <></>;
  if (direction === DirectionEnum.inbound) {
    if (callType === CallTypeEnum.answered) {
      callTypeIcon = (
        <CallReceivedIcon
          fontSize="medium"
          style={{ color: colors.positive }}
        />
      );
    } else if (callType === CallTypeEnum.missed) {
      callTypeIcon = <CallMissedIcon style={{ color: colors.negative }} />;
    }
  } else if (direction === DirectionEnum.outbound) {
    if (callType === CallTypeEnum.answered) {
      callTypeIcon = <CallMadeIcon style={{ color: colors.positive }} />;
    } else if (callType === CallTypeEnum.missed) {
      callTypeIcon = (
        <CallMissedOutgoingIcon style={{ color: colors.negative }} />
      );
    }
  }
  if (callType === CallTypeEnum.voicemail) {
    callTypeIcon = <VoicemailIcon style={{ color: colors.orange }} />;
  }
  return callTypeIcon;
}

export function getDurationInfo(duration: number): string {
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = duration % 60;
  let durationInfo = '';
  if (durationMinutes > 0) {
    durationInfo += durationMinutes + ' min';
  }
  if (durationSeconds > 0) {
    durationInfo += ' and ' + durationSeconds + ' sec';
  }
  return durationInfo;
}
