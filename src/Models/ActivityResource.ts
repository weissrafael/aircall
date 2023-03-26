export interface ActivityResource {
  id: string;
  createdAt: string;
  direction?: DirectionEnum;
  from: string;
  to: string;
  via: string;
  duration: number;
  isArchived: boolean;
  callType?: CallTypeEnum;
  groupedCalls: ActivityResource[];
}

export interface GroupedCallResource {
  id: number;
  createdAt: string;
  duration: number;
}

export enum CallTypeEnum {
  missed = 'missed',
  answered = 'answered',
  voicemail = 'voicemail',
}

export enum DirectionEnum {
  inbound = 'inbound',
  outbound = 'outbound',
}
