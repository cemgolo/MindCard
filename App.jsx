import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import HomeScreen from './screens/HomeScreen';
import DeckDetailScreen from './screens/DeckDetailScreen';
import StartScreen from './screens/StartScreen';
import EditDeckScreen from './screens/EditDeckScreen';
import EditCardScreen from './screens/EditCardScreen';
import ReviewRoundScreen from './screens/ReviewRoundScreen';
import { deckStore, deckPersistor } from './storage/persist-storage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={deckStore}>
      <PersistGate loading={null} persistor={deckPersistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DeckDetail" component={DeckDetailScreen} options={({ route }) => ({ title: route.params?.deck?.name || 'Deck Detail' })} />
            <Stack.Screen name="StartScreen" component={StartScreen} options={({ route }) => ({ title: route.params?.deck?.name || 'Start Screen' })} />
            <Stack.Screen name="EditDeckScreen" component={EditDeckScreen} options={({ route }) => ({ title: route.params?.deck?.name || 'Edit Deck Screen' })} />
            <Stack.Screen name="EditCardScreen" component={EditCardScreen} options={({route}) => ({title: route.params?.deck?.name || 'Edit Card Screen' })} />
            <Stack.Screen name="ReviewRoundScreen" component={ReviewRoundScreen} options={({ route }) => ({ title: route.params?.deck?.name || 'Review Round' })} />

          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
