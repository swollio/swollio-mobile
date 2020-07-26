import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../utilities/Colors';
import ScrollWheel from '../ScrollWheel';
import Card from './Card';

/**
 * This will create a special card called workout card, where 
 * scrollVals = [values to be passed into ScrollWheel]
 * 
 * @param {Object} props Contains props of workout card
 */
export default function WorkoutCard(props) {

    const rows = props.scrollVals.map((arr, index) => {
        return (
            <View key={index} style={styles.rows}>
                <ScrollWheel vals={arr} onChange={props.onChange} />
            </View>
        );
    });

    return(
        <Card barColor={props.barColor}>
            <Text style={styles.title}>{props.title}</Text>
            {rows}
        </Card>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        color: Colors.Black,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5
    }
});