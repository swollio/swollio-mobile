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
        <View style={{alignItems: 'center'}}>
            <View style = {[styles.card, {borderLeftColor: props.barColor}]}>
                { props.children }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width:"95%",
        backgroundColor: Colors.White,
        borderRadius: 11,
        borderLeftWidth: 11,
        padding: 10,
        margin: 15,
    },
});