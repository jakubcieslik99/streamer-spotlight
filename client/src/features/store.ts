import { Store, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import manageStreamersReducer from './streamerSlices/manageStreamers';
import getStreamerReducer from './streamerSlices/getStreamer';
import postStreamerReducer from './streamerSlices/postStreamer';

const reducer = {
  manageStreamers: manageStreamersReducer,
  getStreamer: getStreamerReducer,
  postStreamer: postStreamerReducer,
};

const store: Store = configureStore({
  reducer,
  devTools: import.meta.env.VITE_APP_ENV === 'production' ? false : true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupStore: any = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({ reducer, preloadedState });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
