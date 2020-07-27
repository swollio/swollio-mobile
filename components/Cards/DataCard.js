import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Colors from '../../utilities/Colors';
import Card from './Card';


export default function DataCard() {
    // const data = [
    //     { date: "06-24-2020", weight: 25, reps: 8 },
    //     { date: "06-26-2020", weight: 25, reps: 9 },
    //     { date: "06-28-2020", weight: 25, reps: 10 },
    //     { date: "06-30-2020", weight: 30, reps: 6 },
    //     { date: "07-02-2020", weight: 30, reps: 8 },
    //     { date: "07-04-2020", weight: 30, reps: 6 },
    // ];

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };

    const chartConfig = {
        backgroundGradientFrom: Colors.LightGrey,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: Colors.LightGrey,
        backgroundGradientToOpacity: 1,
        fillShadowGradient: 1,
        fillShadowGradientOpacity: 0.2,
        useShadowColorFromDataset: true,
        color: (opacity = 1) => `rgba(201, 171, 219, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const width = Dimensions.get('window').width;

    return(
        // <Card barColor={Colors.Purple}>
            <LineChart
                data={data}
                width={width}
                height={256}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                bezier
                />
        // </Card>
    );
}

const styles = StyleSheet.create({
    outerView: {
        padding: 10
    }
});