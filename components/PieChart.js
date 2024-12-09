import React from 'react';
import { PieChart as RNMPieChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

const PieChart = ({ data, title = "Performance Overview" }) => {
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <RNMPieChart
        data={data}
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
  );
};

const styles = StyleSheet.create({
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
});

export default PieChart;
