import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PieChart from '../components/PieChart';
import buttonStyles from '../styles/buttons';

const DeckDetailScreen = ({ route, navigation }) => {
  const { deck } = route.params;

  const pieData = [
        {
          name: 'Failed',
          count: deck.performance.failed,
          color: 'red',
          legendFontColor: '#333',
          legendFontSize: 14,
        },
        {
          name: 'Learned',
          count: deck.performance.learned,
          color: 'green',
          legendFontColor: '#333',
          legendFontSize: 14,
        },
        {
          name: 'To Review',
          count: deck.performance.toReview,
          color: 'yellow',
          legendFontColor: '#333',
          legendFontSize: 14,
        },
      ]

  return (
    <View style={styles.container}>
      <Text style={styles.deckName}>{deck.name}</Text>
      <Text style={styles.detailText}>Total Cards: {deck.totalCards}</Text>
      <Text style={styles.detailText}>Cards Per Round: {deck.cardsPerRound || 10}</Text>

      {/* Pie Chart Component */}
      <PieChart data={pieData} />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[buttonStyles.secondary, { flex: 1 }]}
          onPress={() => navigation.navigate('EditDeckScreen', { deck: deck, })}>
          <Text style={buttonStyles.secondaryText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[buttonStyles.primary, {flex: 3}]} onPress={() => navigation.navigate('StartScreen', { deck: deck })}>
          <Text style={buttonStyles.primaryText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    color: '#555',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    margin: 50,
  },
});

export default DeckDetailScreen;