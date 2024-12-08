import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import HomeScreen from './screens/HomeScreen';
import DeckDetailScreen from './screens/DeckDetailScreen';
import StartScreen from './screens/StartScreen';
import EditDeckScreen from './screens/EditDeckScreen';
import ReviewRoundScreen from './screens/ReviewRoundScreen';
import { deckStore, deckPersistor } from './storage/persist-storage';

const Stack = createStackNavigator();
const useDeckNameAsTitle = ({ route }) => ({ title: route.params?.deckName ?? route.name });

const App = () => {
  return (
    <Provider store={deckStore}>
      <PersistGate loading={null} persistor={deckPersistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DeckDetail" component={DeckDetailScreen} options={useDeckNameAsTitle} />
            <Stack.Screen name="StartScreen" component={StartScreen} options={useDeckNameAsTitle} />
            <Stack.Screen name="EditDeckScreen" component={EditDeckScreen} options={useDeckNameAsTitle} />
            <Stack.Screen name="ReviewRoundScreen" component={ReviewRoundScreen} options={useDeckNameAsTitle} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
