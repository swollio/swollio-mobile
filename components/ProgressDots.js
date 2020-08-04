import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../utilities/Colors';

/**
 * This component creates a row of dots at the bottom to show progress.
 * The dots that are filled in are considered completed, and the grey dots
 * are considered not done. The following are the props:
 * - numDots: number => number of dots to render
 * - numEnabled: number => number of dots to fill in
 * @param {Object} props The parameters passed in
 */
export default function ProgressDots(props) {

    const DotRow = [...Array(props.numDots).keys()].map(index => 
        <View 
            key={index}
            style={[
            styles.dot, 
            { backgroundColor: 
                index < props.numEnabled ? Colors.Primary : Colors.Background
            }, props.style]} 
        />);

    return (
        <View style={styles.outerView}>
            {DotRow}
        </View>
    );
}

const styles = StyleSheet.create({
    outerView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        margin: 10
    }
});