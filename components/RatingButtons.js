import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { cardReviewRatings } from "../storage/helper";

const RatingButtons = ({ onRate }) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingTitle}>Rate your recall performance</Text>
      <View style={styles.ratingButtons}>
        {cardReviewRatings.map(rating => 
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