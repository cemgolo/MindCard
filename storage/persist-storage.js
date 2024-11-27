// src/storage/persist-storage.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import deckReducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, deckReducer);

export const deckStore = createStore(persistedReducer);
export const deckPersistor = persistStore(deckStore);
