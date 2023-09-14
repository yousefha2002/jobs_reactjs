import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store , persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<h1></h1>}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
          </Suspense>
        </PersistGate>
        </Provider>
);