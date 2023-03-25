import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

export default class QueryClientProvider {
  queryClient: QueryClient;

  constructor() {
    const ONE_HOUR = 1000 * 60 * 60;

    this.queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: ONE_HOUR,
        },
      },
    });

    createSyncStoragePersister({
      storage: window.localStorage,
    });
  }
}
