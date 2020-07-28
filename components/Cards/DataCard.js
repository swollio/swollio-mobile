import React from 'react'
import { StyleSheet } from 'react-native'
import { AreaChart, Grid } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import * as shape from 'd3-shape'
import Colors from '../../utilities/Colors';
import Card from './Card';
import * as scale from 'd3-scale';


export default function DataCard() {
    const data = [
        { date: new Date("06-27-2020"), weight: 40, reps: 8 },
        { date: new Date("06-28-2020"), weight: 25, reps: 9 },
        { date: new Date("07-01-2020"), weight: 25, reps: 10 },
        { date: new Date("07-02-2020"), weight: 30, reps: 6 },
        { date: new Date("07-06-2020"), weight: 30, reps: 8 },
        { date: new Date("07-07-2020"), weight: 30, reps: 6 },
    ];

    const WeightGradient = ({index}) =>
        <Defs key={index}>
            <LinearGradient id='weightGradient' x1='0%' x2='0%' y1='100%' y2='0%'>
                <Stop offset='0%' stopColor={Colors.Purple} stopOpacity={0.8} />
                <Stop offset='100%' stopColor={Colors.Purple} stopOpacity={0.2} />
            </LinearGradient>
        </Defs>

    return (
        <Card barColor={Colors.Purple}>
            <AreaChart
                style={{height: 200}}
                data={data}
                scale={ scale.scaleTime }
                xAccessor={({item}) => item.date}
                yAccessor={({item}) => item.weight}
                curve={shape.curveLinear}
                svg={{fill: 'url(#weightGradient)'}}
                contentInset={{ top: 20, bottom: 20 }}
                >
                <Grid />
                <WeightGradient />
            </AreaChart>
        </Card>
    );
}

const styles = StyleSheet.create({
    outerView: {
        padding: 10
    }
});