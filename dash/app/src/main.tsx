import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './redux/store';
import App from './App';

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById(`root`)!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster position="top-right" />
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Tooltip
          id="key-comment"
          variant="light"
          className="shadow-lg max-w-sm text-center z-50"
          style={{ borderRadius: `10px`, color: `#475569` }}
        />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
