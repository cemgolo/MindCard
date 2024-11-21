import { configureStore } from '@reduxjs/toolkit';
import deckReducer from './reducer';

export default configureStore({ reducer: deckReducer });
