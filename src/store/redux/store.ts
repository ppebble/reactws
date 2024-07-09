import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import session from 'redux-persist/lib/storage/session';
import { wsSlice } from '../baseParams/baseParams';

const reducers = combineReducers({
	// profile: profileSlice.reducer,
	// init: initSlice.reducer,
	ws: wsSlice.reducer,
});
const persistConfig = {
	key: 'root',
	storage: session,
	whiteList: ['ws'],
};
export const store = configureStore({
	reducer: reducers,
	// reducer: persistReducer(persistConfig, reducers),
	middleware: (getDefaultMiddleWare) =>
		getDefaultMiddleWare({
			serializableCheck: false,
		}),
});
// export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
