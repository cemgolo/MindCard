import React from 'react';
import { PieChart as RNMPieChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

const PieChart = ({ data }) => {
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Performance Overview</Text>
      <RNMPieChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#f4f4f4',
          backgroundGradientFrom: '#f4f4f4',
          backgroundGradientTo: '#f4f4f4',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
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
