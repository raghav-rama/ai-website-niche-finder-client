import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import '@styles/index.scss';
import { FormProvider } from '@context/FormContext.tsx';
import { HostProvider } from '@context/Host.tsx';
import { CleanUpProvider } from '@context/CleanUpContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FormProvider>
      <HostProvider>
        <CleanUpProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CleanUpProvider>
      </HostProvider>
    </FormProvider>
  </React.StrictMode>
);
