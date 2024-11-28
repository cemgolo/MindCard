import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import deckReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, deckReducer);
const storeOptions = {
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
}

export const deckStore = configureStore(storeOptions);
export const deckPersistor = persistStore(deckStore);