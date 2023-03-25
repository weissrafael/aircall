import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import QueryClientProvider from 'Providers/QueryClientProvider';

import App from './App';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryProvider = new QueryClientProvider();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <PersistQueryClientProvider
          client={queryProvider.queryClient}
          persistOptions={{ persister: queryProvider.persister }}
        >
          <App />
        </PersistQueryClientProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
