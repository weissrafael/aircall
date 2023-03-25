import type { Persister } from '@tanstack/query-persist-client-core';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';

export default class QueryClientProvider {
  queryClient: QueryClient;
  persister: Persister;

  constructor() {
    const ONE_HOUR = 1000 * 60 * 60;

    this.queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: ONE_HOUR,
        },
      },
    });

    this.persister = createSyncStoragePersister({
      storage: window.localStorage,
    });
  }
}
