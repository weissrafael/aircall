import { ActivityApiResource } from 'Models/ActitivityApiResource';

import ActivityMapper from './ActivityMapper';

describe('- ActivityMapper -', () => {
  it('should NOT group together calls from the same day and same callers BUT diff call_type', () => {
    const input = [
      {
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 10,
        is_archived: true,
        call_type: 'answered',
        id: '6393bb7b69073dc45849ca7c',
        created_at: '2022-12-12T22:49:31.911Z',
      },
      {
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 0,
        is_archived: true,
        call_type: 'missed',
        id: '639737ac587edc08100c026f',
        created_at: '2022-12-12T14:16:12.721Z',
      },
    ] as unknown as ActivityApiResource[];
    const expectedObject = [
      {
        id: '6393bb7b69073dc45849ca7c',
        createdAt: '2022-12-12T22:49:31.911Z',
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 10,
        isArchived: true,
        callType: 'answered',
        groupedCalls: [],
        avatarUrl: 0,
      },
      {
        id: '639737ac587edc08100c026f',
        createdAt: '2022-12-12T14:16:12.721Z',
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 0,
        isArchived: true,
        callType: 'missed',
        groupedCalls: [],
        avatarUrl: 1,
      },
    ];

    const result = ActivityMapper(input);
    expect(result).toStrictEqual(expectedObject);
  });

  it('should NOT group together calls from the diff day even when same callers and same call_type', () => {
    const input = [
      {
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 10,
        is_archived: true,
        call_type: 'answered',
        id: '6393bb7b69073dc45849ca7c',
        created_at: '2022-12-11T22:49:31.911Z',
      },
      {
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 0,
        is_archived: true,
        call_type: 'answered',
        id: '639737ac587edc08100c026f',
        created_at: '2022-12-12T14:16:12.721Z',
      },
    ] as unknown as ActivityApiResource[];
    const expectedObject = [
      {
        id: '639737ac587edc08100c026f',
        createdAt: '2022-12-12T14:16:12.721Z',
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 0,
        isArchived: true,
        callType: 'answered',
        groupedCalls: [],
        avatarUrl: 0,
      },
      {
        id: '6393bb7b69073dc45849ca7c',
        createdAt: '2022-12-11T22:49:31.911Z',
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 10,
        isArchived: true,
        callType: 'answered',
        groupedCalls: [],
        avatarUrl: 1,
      },
    ];

    const result = ActivityMapper(input);
    expect(result).toStrictEqual(expectedObject);
  });

  it('should be in desc order by created_at', () => {
    const input = [
      {
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 10,
        is_archived: true,
        call_type: 'answered',
        id: '6393bb7b69073dc45849ca7c',
        created_at: '2022-12-11T22:49:31.911Z',
      },
      {
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 0,
        is_archived: true,
        call_type: 'answered',
        id: '639737ac587edc08100c026f',
        created_at: '2022-12-12T14:16:12.721Z',
      },
    ] as unknown as ActivityApiResource[];
    const expectedObject = [
      {
        id: '639737ac587edc08100c026f',
        createdAt: '2022-12-12T14:16:12.721Z',
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 0,
        isArchived: true,
        callType: 'answered',
        groupedCalls: [],
        avatarUrl: 0,
      },
      {
        id: '6393bb7b69073dc45849ca7c',
        createdAt: '2022-12-11T22:49:31.911Z',
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 10,
        isArchived: true,
        callType: 'answered',
        groupedCalls: [],
        avatarUrl: 1,
      },
    ];

    const result = ActivityMapper(input);
    expect(result).toStrictEqual(expectedObject);
  });
});
