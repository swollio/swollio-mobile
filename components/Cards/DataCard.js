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
        {
            value: 50,
            date: new Date(2018, 0, 1, 2),
        },
        {
            value: 10,
            date: new Date(2018, 0, 1, 9),
        },
        {
            value: 150,
            date: new Date(2018, 0, 1, 10),
        },
        {
            value: 10,
            date: new Date(2018, 0, 1, 13),
        },
        {
            value: 100,
            date: new Date(2018, 0, 1, 21),
        },
        {
            value: 20,
            date: new Date(2018, 0, 2, 0),
        },
        {
            value: 115,
            date: new Date(2018, 0, 2, 8),
        },
        {
            value: 75,
            date: new Date(2018, 0, 2, 10),
        },
        {
            value: 25,
            date: new Date(2018, 0, 2, 16),
        },
        {
            value: 125,
            date: new Date(2018, 0, 2, 17),
        },
        {
            value: 66,
            date: new Date(2018, 0, 2, 19),
        },
        {
            value: 85,
            date: new Date(2018, 0, 2, 23),
        },
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
                yAccessor={({item}) => item.value}
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