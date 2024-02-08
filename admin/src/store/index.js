import { configureStore } from '@reduxjs/toolkit';
import { persistCombineReducers } from 'redux-persist';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import thunk from "react-redux";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import authSlice from './auth-slice';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistCombineReducers(persistConfig, {
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer: persistedReducer,
  // middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;
