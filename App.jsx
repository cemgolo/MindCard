import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import HomeScreen from './screens/HomeScreen';
import DeckDetailScreen from './screens/DeckDetailScreen';
import { deckStore, deckPersistor } from './storage/persist-storage';
import EditDeckScreen from './screens/EditDeckScreen';
import EditCardScreen from './screens/EditCardScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={deckStore}>
      <PersistGate loading={null} persistor={deckPersistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DeckDetail" component={DeckDetailScreen} options={({ route }) => ({ title: route.params.deck.name })} />
            <Stack.Screen name="EditDeckScreen" component={EditDeckScreen} options={{title: 'Edit Deck', }}/>
            <Stack.Screen name="EditCardScreen" component={EditCardScreen} options={{title: 'Edit Card', }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
