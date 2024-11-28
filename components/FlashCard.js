import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FlashCard = ({ front, back, flipped, onFlip, onRate }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{flipped ? back : front}</Text>
      </View>
      {!flipped ? (
        <TouchableOpacity style={styles.flipButton} onPress={onFlip}>
          <Text style={styles.flipButtonText}>Flip card</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Rate your recall performance</Text>
          <View style={styles.ratingButtons}>
            <TouchableOpacity style={styles.failButton} onPress={onRate}>
              <Text style={styles.buttonText}>Fail</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.slowButton} onPress={onRate}>
              <Text style={styles.buttonText}>Slow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.averageButton} onPress={onRate}>
              <Text style={styles.buttonText}>Average</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fastButton} onPress={onRate}>
              <Text style={styles.buttonText}>Fast</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    width: '80%',
    height: '50%',
    justifyContent: 'center', 
    alignItems: 'center', // Centers text horizontally
  },
  cardText: {
    fontSize: 32, // Set a larger default size
    fontWeight: 'bold',
    textAlign: 'center',
    flexShrink: 1, 
    maxWidth: '90%', 
  },
  flipButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  flipButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',            // Ensures the text takes full width of the container
    textAlignVertical: 'center',
  },
  ratingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  failButton: {
    width: 70, 
    height: 40, 
    padding: 10,
    backgroundColor: '#ff6666',
    borderRadius: 5,
    marginHorizontal: 5,  
  },
  slowButton: {
    width: 70, 
    height: 40, 
    padding: 10,
    backgroundColor: '#ffd966',
    borderRadius: 5,
    marginHorizontal: 5,  
  },
  averageButton: {
    width: 70, 
    height: 40, 
    padding: 10,
    backgroundColor: '#00bbff',
    borderRadius: 5,
    marginHorizontal: 5,  
  },
  fastButton: {
    width: 70, 
    height: 40, 
    padding: 10,
    backgroundColor: '#66cc66',
    borderRadius: 5,
    marginHorizontal: 5,  
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default FlashCard;
