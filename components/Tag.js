import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../utilities/Colors';

export default function Tag (props) {
    return(
        <View style={[styles.tagOutline, props.tagStyle, { width : props.tag.length > 5 ? 'auto' : 50} ]}>
            <Text style={[styles.tagText]}>{props.tag}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tagOutline: {
        borderColor: Colors.Primary,
        borderWidth: 1,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5, 
        marginRight: 5
    },
    tagText: {
        fontFamily: "Comfortaa_400Regular",
        fontSize: 16,
        color: Colors.Primary,
        alignSelf: 'center'
    }
});