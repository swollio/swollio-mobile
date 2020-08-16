import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../utilities/Colors';

export default function WaterMark(props) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.watermark}>{props.title}</Text>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    watermark: {
        textAlign: 'center',
        fontSize: 24,
        color: Colors.SurfaceContrast2,
        fontFamily: 'Comfortaa_500Medium',
    },
})