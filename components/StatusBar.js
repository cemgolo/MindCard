import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const StatusBar = () => {
  const [showStatusText, setShowStatusText] = useState(false);

  const toggleStatusText = () => {
    setShowStatusText(!showStatusText);
  };

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <TouchableOpacity onPress={toggleStatusText}>
        <View style={styles.statusBar}>
          <View style={[styles.statusSegment, { backgroundColor: '#ff6666', flex: 144 }]} />
          <View style={[styles.statusSegment, { backgroundColor: '#ffd966', flex: 130 }]} />
          <View style={[styles.statusSegment, { backgroundColor: '#66cc66', flex: 300 }]} />
        </View>
      </TouchableOpacity>

      {/* Status Text Box (Speech Bubble) */}
      {showStatusText && (
        <View style={styles.speechBox}>
          <Text style={styles.speechText}>144 learning / 130 to review / 300 learned</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Ensures spacing below the component
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
