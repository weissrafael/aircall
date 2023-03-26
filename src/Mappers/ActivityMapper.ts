import { ActivityApiResource } from '../Models/ActitivityApiResource';
import {
  ActivityResource,
  CallTypeEnum,
  DirectionEnum,
} from '../Models/ActivityResource';

interface GroupedActivities {
  [key: string]: ActivityApiResource[];
}

export default function activityMapper(
  rawActivities: ActivityApiResource[]
): ActivityResource[] {
  const sortedActivities = sortActivities(rawActivities);
  const groupedActivities = groupActivities(sortedActivities);
  return attachActivities(groupedActivities);
}

const sortActivities = (unsortedActivities: ActivityApiResource[]) => {
  return [...unsortedActivities].sort(
    (activity1, activity2) =>
      new Date(activity2.created_at).getTime() -
      new Date(activity1.created_at).getTime()
  );
};

const groupActivities = (
  activities: ActivityApiResource[]
): GroupedActivities => {
  const groupedCalls: GroupedActivities = {};
  activities.forEach((activity) => {
    const { created_at } = activity;
    const [currentDate] = new Date(created_at).toISOString().split('T');
    if (!(currentDate in groupedCalls)) {
      groupedCalls[currentDate] = [];
    }
    groupedCalls[currentDate].push(activity);
  });
  return groupedCalls;
};

const attachActivities = (groupedActivities: GroupedActivities) => {
  let finalArray: ActivityResource[] = [];
  for (const activities of Object.values(groupedActivities)) {
    const auxArray: ActivityResource[] = [];

    activities.forEach((activity) => {
      const index = auxArray.findIndex(
        (item) =>
          activity.call_type === item.callType?.valueOf() &&
          activity.from === item.from &&
          activity.to === item.to &&
          activity.direction === item.direction?.valueOf()
      );
      const frontActivity = activityApiToFrontResource(activity);
      if (index === -1) {
        auxArray.push(frontActivity);
      } else {
        auxArray[index].groupedCalls.push(frontActivity);
      }
    });
    finalArray = [...finalArray, ...auxArray];
  }
  return finalArray;
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
