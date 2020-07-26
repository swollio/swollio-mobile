import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../utilities/Colors';

export default function Card(props) {
    return (
        <View style={{alignItems: 'center'}}>
            <View style = {[styles.outerCard, , {borderLeftColor: Colors.Green}]}>
                { props.children }
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    outerCard: {
        width:"95%",
        backgroundColor: Colors.White,
        borderRadius: 11,
        borderLeftWidth: 11,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 15,
    },
});