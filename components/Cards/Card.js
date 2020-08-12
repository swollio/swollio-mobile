import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../utilities/Colors';

/**
 * This component returns a Card, which is the building block of our UI. This card is formatted
 * to be a view with a left border of the given color
 * 
 * @param {Object} props The only props are going to be the children which are embedded in this card
 */
export default function Card(props) {
    return (
        <View style = {[styles.card, { borderLeftColor: props.barColor || Colors.Primary }, props.style]}>
            { props.children }
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.Surface,
        borderRadius: 4,
        borderLeftWidth: 10,
        padding: 10,
        marginBottom: 8,
    },
});