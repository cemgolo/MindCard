import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import HomeScreen from './screens/HomeScreen';
import DeckDetailScreen from './screens/DeckDetailScreen';
import CardsScreen from './screens/CardsScreen';
import { deckStore, deckPersistor } from './storage/persist-storage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={deckStore}>
      <PersistGate loading={null} persistor={deckPersistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DeckDetail" component={DeckDetailScreen} options={({ route }) => ({ title: route.params.deck.name })} />
            <Stack.Screen name="CardsScreen" component={CardsScreen} options={({ route }) => ({ title: route.params.deck.name })} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
