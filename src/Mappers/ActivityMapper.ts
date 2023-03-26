import { ActivityApiResource } from '../Models/ActitivityApiResource';
import {
  ActivityResource,
  CallTypeEnum,
  DirectionEnum,
} from '../Models/ActivityResource';

export default function activityMapper(
  rawActivities: ActivityApiResource[]
): ActivityResource[] {
  const formattedActivities = formatActivities(rawActivities);
  const sortedActivities = sortActivities(formattedActivities);
  return groupActivities(sortedActivities);
}

function formatActivities(
  activities: ActivityApiResource[]
): ActivityResource[] {
  return activities.map((activity) => {
    return activityApiToFrontResource(activity);
  });
}

export function filterArchivedActivities(calls: ActivityApiResource[]) {
  const nonArchivedCalls: ActivityApiResource[] = calls.filter(
    (call: ActivityApiResource) => !call.is_archived
  );
  const archivedCalls: ActivityApiResource[] = calls.filter(
    (call: ActivityApiResource) => call.is_archived
  );
  return { nonArchivedCalls, archivedCalls };
}

const sortActivities = (unsortedActivities: ActivityResource[]) => {
  return [...unsortedActivities].sort(
    (activity1, activity2) =>
      new Date(activity2.createdAt).getTime() -
      new Date(activity1.createdAt).getTime()
  );
};

const groupActivities = (
  activities: ActivityResource[]
): ActivityResource[] => {
  const groupedCalls: { [key: string]: ActivityResource } = activities.reduce(
    (groups: { [key: string]: ActivityResource }, call: ActivityResource) => {
      const key = `${call.createdAt.split('T')[0]}_${call.from}_${
        call.callType
      }`;
      if (!groups[key]) {
        groups[key] = { ...call, groupedCalls: [] };
      } else {
        groups[key].groupedCalls?.push(call);
      }
      return groups;
    },
    {}
  );

  return Object.values(groupedCalls).map(({ groupedCalls, ...call }) => ({
    ...call,
    avatarUrl: Math.floor(Math.random() * 10) + 1, //random number to get random avatar mock image
    groupedCalls: groupedCalls?.length ? groupedCalls : [],
  }));
};

const activityApiToFrontResource = (
  activity: ActivityApiResource
): ActivityResource => {
  const {
    id,
    created_at: createdAt,
    direction,
    from,
    to,
    via,
    duration,
    is_archived: isArchived,
    call_type,
  } = activity;
  return {
    id,
    createdAt,
    direction: DirectionEnum[direction],
    from,
    to,
    via,
    duration,
    isArchived,
    callType: call_type ? CallTypeEnum[activity.call_type] : undefined,
    groupedCalls: [],
  };
};
