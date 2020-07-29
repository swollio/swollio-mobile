import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../utilities/Colors';
import DataCard from '../components/Cards/DataCard';

export default function StatisticsPage(props) {
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Statistics</Text>
            </View>
            <ScrollView padding={10} style={{height: '100%'}}>
                <DataCard />
            </ScrollView>
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
    },
    title: {
        fontSize: 32,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
})