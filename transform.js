const dataExample = JSON.parse(
  '[{"direction":"outbound","from":100000,"to":200000,"via":30000000,"duration":0,"call_type":"missed","is_archived":true,"id":"6393bb5469073dc45849ca7a","created_at":"2022-12-09T22:48:52.789Z"},{"direction":"inbound","from":100001,"to":200002,"via":30000003,"duration":10,"is_archived":true,"call_type":"answered","id":"6393bb7b69073dc45849ca7c","created_at":"2022-12-09T22:49:31.911Z"},{"direction":"inbound","from":100001,"to":200001,"via":30000001,"duration":0,"is_archived":true,"call_type":"missed","id":"639737ac587edc08100c026f","created_at":"2022-12-12T14:16:12.721Z"},{"direction":"inbound","from":100002,"to":200002,"via":30000002,"duration":20,"is_archived":true,"call_type":"voicemail","id":"63973961362d5c09cd79364a","created_at":"2022-12-12T14:23:29.409Z"},{"direction":"inbound","from":100003,"to":200003,"via":30000003,"duration":100,"is_archived":true,"call_type":"answered","id":"639746e963147b03c894f521","created_at":"2022-12-12T15:21:13.564Z"},{"direction":"inbound","from":100004,"to":200004,"via":30000004,"duration":1,"is_archived":true,"call_type":"voicemail","id":"639747acb585e7e5526eb46a","created_at":"2022-12-12T15:24:28.091Z"},{"direction":"inbound","from":100005,"to":200005,"via":30000005,"duration":2,"is_archived":true,"call_type":"voicemail","id":"63974a811f096c984321fe0b","created_at":"2022-12-12T15:36:33.277Z"},{"duration":0,"is_archived":false,"id":"639a0f0a328500b1a0fa9bf7","created_at":"2022-12-14T17:59:38.665Z"},{"duration":0,"is_archived":false,"id":"639a0f11328500b1a0fa9bf9","created_at":"2022-12-14T17:59:45.719Z"},{"duration":0,"is_archived":false,"id":"639a0fe5328500b1a0fa9bfe","created_at":"2022-12-14T18:03:17.250Z"},{"direction":"inbound","from":1231,"to":12321,"via":12312,"duration":21312,"is_archived":true,"call_type":"missed","id":"639a1043328500b1a0fa9c01","created_at":"2022-12-14T18:04:51.894Z"},{"direction":"inbound","from":1234,"to":1234,"via":1234,"duration":21312,"is_archived":true,"call_type":"missed","id":"639a10a9328500b1a0fa9c04","created_at":"2022-12-14T18:06:33.291Z"},{"direction":"inbound","to":1234,"via":1234,"duration":21312,"is_archived":false,"call_type":"missed","id":"639a10b8328500b1a0fa9c07","created_at":"2022-12-14T18:06:48.754Z"},{"duration":0,"is_archived":false,"id":"639a1411896e0d0f4bf88b2b","created_at":"2022-12-14T18:21:05.710Z"},{"direction":"inbound","to":1234,"via":1234,"duration":21312,"is_archived":false,"call_type":"missed","id":"639a143c896e0d0f4bf88b2e","created_at":"2022-12-14T18:21:48.406Z"},{"to":1234,"via":1234,"duration":21312,"is_archived":false,"call_type":"missed","id":"639a144e896e0d0f4bf88b31","created_at":"2022-12-14T18:22:06.485Z"},{"direction":"inbound","from":1234,"to":1234,"via":1234,"duration":21312,"is_archived":true,"call_type":"missed","id":"639a177121da466572fd6bd8","created_at":"2022-12-14T18:35:29.422Z"},{"direction":"outbound","from":1234,"to":1234,"via":1234,"duration":21312,"is_archived":true,"call_type":"missed","id":"639a178921da466572fd6bdb","created_at":"2022-12-14T18:35:53.057Z"},{"direction":"outbound","from":1234,"to":1234,"via":1234,"duration":21312,"is_archived":true,"call_type":"missed","id":"639a178f21da466572fd6bdd","created_at":"2022-12-14T18:35:59.854Z"}]'
);

const sortedDate = [...dataExample].sort(
  (activity1, activity2) =>
    new Date(activity2.created_at) - new Date(activity1.created_at)
);

const formatedData = {};

sortedDate.forEach((activity) => {
  const { created_at } = activity;
  const [currentDate] = new Date(created_at).toISOString().split('T');
  if (!(currentDate in formatedData)) {
    formatedData[currentDate] = [];
  }
  formatedData[currentDate].push(activity);
});
let finalArray = [];

for (const [_, activities] of Object.entries(formatedData)) {
  const auxArray = [];

  activities.forEach((activity) => {
    const index = auxArray.findIndex(
      (item) =>
        activity.call_type === item.call_type &&
        activity.from === item.from &&
        activity.to === item.to &&
        activity.direction === item.direction
    );

    if (index === -1) {
      activity.related_activities = [];
      auxArray.push(activity);
    } else {
      auxArray[index].related_activities.push(activity);
    }
  });
  finalArray = [...finalArray, ...auxArray];
}

console.log(JSON.stringify(finalArray, null, 4));

const breno = [
  {
    id: '639a178f21da466572fd6bdd',
    createdAt: '2022-12-14T18:35:59.854Z',
    direction: 'outbound',
    from: 1234,
    to: 1234,
    via: 1234,
    duration: 21312,
    isArchived: true,
    callType: 'missed',
    groupedCalls: [
      {
        id: '639a178921da466572fd6bdb',
        createdAt: '2022-12-14T18:35:53.057Z',
        direction: 'outbound',
        from: 1234,
        to: 1234,
        via: 1234,
        duration: 21312,
        isArchived: true,
        callType: 'missed',
        groupedCalls: [],
      },
    ],
  },
  {
    id: '639a177121da466572fd6bd8',
    createdAt: '2022-12-14T18:35:29.422Z',
    direction: 'inbound',
    from: 1234,
    to: 1234,
    via: 1234,
    duration: 21312,
    isArchived: true,
    callType: 'missed',
    groupedCalls: [
      {
        id: '639a10a9328500b1a0fa9c04',
        createdAt: '2022-12-14T18:06:33.291Z',
        direction: 'inbound',
        from: 1234,
        to: 1234,
        via: 1234,
        duration: 21312,
        isArchived: true,
        callType: 'missed',
        groupedCalls: [],
      },
    ],
  },
  {
    id: '639a144e896e0d0f4bf88b31',
    createdAt: '2022-12-14T18:22:06.485Z',
    to: 1234,
    via: 1234,
    duration: 21312,
    isArchived: false,
    callType: 'missed',
    groupedCalls: [],
  },
  {
    id: '639a143c896e0d0f4bf88b2e',
    createdAt: '2022-12-14T18:21:48.406Z',
    direction: 'inbound',
    to: 1234,
    via: 1234,
    duration: 21312,
    isArchived: false,
    callType: 'missed',
    groupedCalls: [
      {
        id: '639a10b8328500b1a0fa9c07',
        createdAt: '2022-12-14T18:06:48.754Z',
        direction: 'inbound',
        to: 1234,
        via: 1234,
        duration: 21312,
        isArchived: false,
        callType: 'missed',
        groupedCalls: [],
      },
    ],
  },
  {
    id: '639a1411896e0d0f4bf88b2b',
    createdAt: '2022-12-14T18:21:05.710Z',
    duration: 0,
    isArchived: false,
    groupedCalls: [
      {
        id: '639a0fe5328500b1a0fa9bfe',
        createdAt: '2022-12-14T18:03:17.250Z',
        duration: 0,
        isArchived: false,
        groupedCalls: [],
      },
      {
        id: '639a0f11328500b1a0fa9bf9',
        createdAt: '2022-12-14T17:59:45.719Z',
        duration: 0,
        isArchived: false,
        groupedCalls: [],
      },
      {
        id: '639a0f0a328500b1a0fa9bf7',
        createdAt: '2022-12-14T17:59:38.665Z',
        duration: 0,
        isArchived: false,
        groupedCalls: [],
      },
    ],
  },
  {
    id: '639a1043328500b1a0fa9c01',
    createdAt: '2022-12-14T18:04:51.894Z',
    direction: 'inbound',
    from: 1231,
    to: 12321,
    via: 12312,
    duration: 21312,
    isArchived: true,
    callType: 'missed',
    groupedCalls: [],
  },
  {
    id: '63974a811f096c984321fe0b',
    createdAt: '2022-12-12T15:36:33.277Z',
    direction: 'inbound',
    from: 100005,
    to: 200005,
    via: 30000005,
    duration: 2,
    isArchived: true,
    callType: 'voicemail',
    groupedCalls: [],
  },
  {
    id: '639747acb585e7e5526eb46a',
    createdAt: '2022-12-12T15:24:28.091Z',
    direction: 'inbound',
    from: 100004,
    to: 200004,
    via: 30000004,
    duration: 1,
    isArchived: true,
    callType: 'voicemail',
    groupedCalls: [],
  },
  {
    id: '639746e963147b03c894f521',
    createdAt: '2022-12-12T15:21:13.564Z',
    direction: 'inbound',
    from: 100003,
    to: 200003,
    via: 30000003,
    duration: 100,
    isArchived: true,
    callType: 'answered',
    groupedCalls: [],
  },
  {
    id: '63973961362d5c09cd79364a',
    createdAt: '2022-12-12T14:23:29.409Z',
    direction: 'inbound',
    from: 100002,
    to: 200002,
    via: 30000002,
    duration: 20,
    isArchived: true,
    callType: 'voicemail',
    groupedCalls: [],
  },
  {
    id: '639737ac587edc08100c026f',
    createdAt: '2022-12-12T14:16:12.721Z',
    direction: 'inbound',
    from: 100001,
    to: 200001,
    via: 30000001,
    duration: 0,
    isArchived: true,
    callType: 'missed',
    groupedCalls: [],
  },
  {
    id: '6393bb7b69073dc45849ca7c',
    createdAt: '2022-12-09T22:49:31.911Z',
    direction: 'inbound',
    from: 100001,
    to: 200002,
    via: 30000003,
    duration: 10,
    isArchived: true,
    callType: 'answered',
    groupedCalls: [],
  },
  {
    id: '6393bb5469073dc45849ca7a',
    createdAt: '2022-12-09T22:48:52.789Z',
    direction: 'outbound',
    from: 100000,
    to: 200000,
    via: 30000000,
    duration: 0,
    isArchived: true,
    callType: 'missed',
    groupedCalls: [],
  },
];
