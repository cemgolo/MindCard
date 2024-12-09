import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Rating } from "ts-fsrs";

const RatingButtons = ({ onRate }) => {
  const ratings = [
    { label: 'Fail', action: Rating.Again, color: '#ff6666' },
    { label: 'Slow', action: Rating.Hard, color: '#ffd966' },
    { label: 'Average', action: Rating.Good, color: '#00bbff' },
    { label: 'Fast', action: Rating.Easy, color: '#66cc66' }
  ];

  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingTitle}>Rate your recall performance</Text>
      <View style={styles.ratingButtons}>
        {ratings.map(rating => 
          <TouchableOpacity key={rating.label} style={[styles.button, {backgroundColor: rating.color}]} onPress={() => onRate(rating.action)}>
            <Text style={styles.buttonText}>{rating.label}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
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
  button: {
    width: 80, 
    height: 40, 
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 3,  
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default RatingButtons;