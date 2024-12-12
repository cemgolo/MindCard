import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import buttonStyles from '../styles/buttons';
import { useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;

const ReviewSessionEndScreen = ({ route, navigation }) => {
  const { deckUuid, userRatings } = route.params;
  const deck = useSelector(state => state.decks.find(deck => deck.uuid === deckUuid));
  useEffect(() => navigation.setOptions({'title': deck.name}), [navigation, deck]);

  const data = {
    labels: Object.keys(userRatings),
    datasets: [
      {
        data: Object.values(userRatings),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Round</Text>
      <BarChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={buttonStyles.secondary} onPress={() => navigation.navigate('DeckDetail', { deckUuid })}>
            <Text style={buttonStyles.secondaryText}>Back to deck</Text>
          </TouchableOpacity>      
          <TouchableOpacity style={buttonStyles.primary} onPress={() => navigation.popToTop()}>
            <Text style={buttonStyles.primaryText}>Home</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    margin: 50,
  },
});

export default ReviewSessionEndScreen;