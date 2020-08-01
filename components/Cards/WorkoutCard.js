import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../utilities/Colors';
import ScrollWheel from '../ScrollWheel';
import Card from './Card';

function capitalize(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

/**
 * This will create a special card called workout card, where we have rows
 * of Scroll Wheels, and the dataVals for each scroll wheel is passed in as
 * an array in a list of arrays
 * 
 * @param {Object} props Contains props of workout card
 */
export default function WorkoutCard(props) {

    // Defining a constant which will make the appropriate amount
    // of scroll wheel rows
    const rows = props.scrollVals.map((arr, index) => {
        return (
            <View key={index} style={styles.rows}>
                <ScrollWheel vals={arr} selectColor={props.selectColor} onChange={props.onChange} />
            </View>
        );
    });

    return(
        <Card barColor={props.barColor}>
            <Text style={styles.title}>{capitalize(props.title)}</Text>
            {rows}
        </Card>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'left',
        marginBottom: 15
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5
    }
});