import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../utilities/Colors';
import DataCard from '../components/Cards/DataCard';
import { getStatisticsForAthlete } from '../utilities/api'
import moment from 'moment'
import WaterMark from '../components/WaterMark'

import headerStyles from './styles/Header'

export default function StatisticsPage(props) {
    const [weightSeries, setWeightSeries] = useState(null);

    useEffect(() => {
        if (weightSeries === null) {
            getStatisticsForAthlete(props.user.athlete_id).then(data => {
                setWeightSeries(data);
            });
        }
        return () => {} 
    });

    return (
        <View style={{height: "100%"}}>
            <View style={[headerStyles.container, headerStyles.header]}>
                <Text style={headerStyles.title}>Statistics</Text>
            </View>
            {
                (weightSeries === null && <WaterMark title={'Loading...'}/>) ||
                (weightSeries.length === 0 && <WaterMark title={'No Statistics'}/>) ||
                <ScrollView padding={10} style={{height: '100%'}}>
                    {(weightSeries).map((e, index) => {
                        return (
                            <DataCard 
                            key={index}
                            exercise_name={e.exercise_name}
                            data={e.weight_series.map(x => ({
                                value: x.avg_weight,
                                date: new Date(x.date)
                            }))}/>
                        )
                    })}
                </ScrollView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 15,
        borderColor: Colors.BackgroundContrast,
        borderBottomWidth: 3,
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    title: {
        fontSize: 32,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
})