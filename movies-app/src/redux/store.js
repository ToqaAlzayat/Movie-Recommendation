import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducer';

const store = configureStore({
  reducer: movieReducer,
});

export default store;
