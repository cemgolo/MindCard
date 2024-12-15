import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { cardStateColors } from '../storage/helper';
import { State } from 'ts-fsrs';

const StatusBar = () => {
  const [showStatusText, setShowStatusText] = useState(false);
  const decks = useSelector(state => state.decks);
  const cardStates = decks.map(deck => deck.cards).flat(1).map(card => card.state);
  const cardStateCounts = cardStates.reduce((acc, curr) => {
    acc[curr] ? ++acc[curr] : acc[curr] = 1;
    return acc;
  }, {});

  const statusText = Object.entries(cardStateCounts).map(([state, cardCount]) => `${State[state]}: ${cardCount}`).join(' / ') || 'No cards have been added';

  const toggleStatusText = () => {
    setShowStatusText(!showStatusText);
  };

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <TouchableOpacity onPress={toggleStatusText}>
        <View style={styles.statusBar}>
          {Object.entries(cardStateCounts).map(([state, cardCount]) => 
            <View key={state} style={[styles.statusSegment, { backgroundColor: cardStateColors[state], flex: cardCount }]} />
          )}
        </View>
      </TouchableOpacity>

      {/* Status Text Box (Speech Bubble) */}
      {showStatusText && (
        <View style={styles.speechBox}>
          <Text style={styles.speechText}>{statusText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  statusBar: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: '#ddd',
  },
  statusSegment: {
    height: '100%',
  },
  speechBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 5,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    position: 'relative',
  },
  speechText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default StatusBar;
