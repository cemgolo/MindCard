import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import HomeScreen from './screens/HomeScreen';
import DeckDetailScreen from './screens/DeckDetailScreen';
import ReviewSessionScreen from './screens/ReviewSessionScreen';
import EditDeckScreen from './screens/EditDeckScreen';
import EditCardScreen from './screens/EditCardScreen';
import ReviewSessionEndScreen from './screens/ReviewSessionResultsScreen';
import { deckStore, deckPersistor } from './storage/persist-storage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={deckStore}>
      <PersistGate loading={null} persistor={deckPersistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DeckDetail" component={DeckDetailScreen} />
            <Stack.Screen name="ReviewSessionScreen" component={ReviewSessionScreen} />
            <Stack.Screen name="EditDeckScreen" component={EditDeckScreen} />
            <Stack.Screen name="EditCardScreen" component={EditCardScreen} />
            <Stack.Screen name="ReviewSessionEndScreen" component={ReviewSessionEndScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
