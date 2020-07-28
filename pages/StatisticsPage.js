import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../utilities/Colors';
import DataCard from '../components/Cards/DataCard';

export default function StatisticsPage(props) {
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Statistics</Text>
            </View>
            <View style={{margin: 10}}>
                <DataCard />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 15,
        paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: Colors.Purple,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: {
        fontSize: 32,
        color: Colors.White,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
})