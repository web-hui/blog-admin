import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './user';

const rootReducer = combineReducers({
  userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
