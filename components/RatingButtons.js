import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RatingButtons = ({ onRate }) => {
    return (
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
  failButton: {
    width: 80, 
    height: 40, 
    padding: 10,
    backgroundColor: '#ff6666',
    borderRadius: 5,
    marginHorizontal: 3,  
  },
  slowButton: {
    width: 80, 
    height: 40, 
    padding: 10,
    backgroundColor: '#ffd966',
    borderRadius: 5,
    marginHorizontal: 3,  
  },
  averageButton: {
    width: 80, 
    height: 40, 
    padding: 10,
    backgroundColor: '#00bbff',
    borderRadius: 5,
    marginHorizontal: 3,  
  },
  fastButton: {
    width: 80, 
    height: 40, 
    padding: 10,
    backgroundColor: '#66cc66',
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