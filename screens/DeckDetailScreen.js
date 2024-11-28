import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import buttonStyles from '../styles/buttons';

const DeckDetailScreen = ({ route, navigation }) => {
  const { deck } = route.params;

  // Data for the pie chart
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
  ];

  return (
    <View style={styles.container}>
      {/* Deck Name */}
      <Text style={styles.deckName}>{deck.name}</Text>

      {/* Deck Details */}
      <Text style={styles.detailText}>Total Cards: {deck.totalCards}</Text>
      <Text style={styles.detailText}>Cards Per Round: {deck.cardsPerRound || 10}</Text>

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Performance Overview</Text>
        <PieChart
          data={pieData}
          width={Dimensions.get('window').width - 40} // Chart width (screen width minus some padding)
          height={220} // Chart height
          chartConfig={{
            backgroundColor: '#f4f4f4',
            backgroundGradientFrom: '#f4f4f4',
            backgroundGradientTo: '#f4f4f4',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="count" // Key to determine value
          backgroundColor="transparent"
          paddingLeft="15"
          absolute // Show absolute values
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[buttonStyles.secondary, { flex: 1 }]}
          onPress={() => navigation.navigate('EditDeckScreen', { deck: deck, })}>
          <Text style={buttonStyles.secondaryText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[buttonStyles.primary, { flex: 3 }]}
          onPress={() => console.log('Start deck')}
        >
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
  chartContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    margin: 50,
  },
});

export default DeckDetailScreen;
