import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/paper-dashboard.css';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store } from './store/redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		{/* <PersistGate persistor={persistor}> */}
		<QueryClientProvider client={new QueryClient()}>
			<App />
		</QueryClientProvider>
		{/* </PersistGate> */}
	</Provider>,
);
