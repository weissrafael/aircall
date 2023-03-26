export interface ActivityApiResource {
  id: number;
  created_at: string;
  direction: DirectionApiEnum;
  from: string;
  to: string;
  via: string;
  duration: number;
  is_archived: boolean;
  call_type: CallTypeApiEnum;
}

export enum CallTypeApiEnum {
  missed = 'missed',
  answered = 'answered',
  voicemail = 'voicemail',
}

export enum DirectionApiEnum {
  inbound = 'inbound',
  outbound = 'outbound',
}
