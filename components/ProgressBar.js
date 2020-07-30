import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Creates a progress bar which shows a bar with props.val % of the progress
 * bar filled with the color passed in
 * @param {Object} props Contains all of the properties of the Progress Bar
 */
export default function ProgressBar(props) {
    return(
        <View style = {[styles.container, { width: props.barWidth }]} >
            <View style = {styles.progressOutline}>
                <View style={[styles.progressFill, {
                    width: (props.val + "%"),
                    borderTopRightRadius: props.val === 100 ? 5 : 0,
                    borderBottomRightRadius: props.val === 100 ? 5 : 0,
                    backgroundColor: props.color}]}>
                </View>
            </View>
            <Text style = {styles.progressText}>{props.val + "%"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 30,
        borderRadius: 15,
        color: "#24272B"
    },
    progressText: {
      textAlign: 'center'
    },
    progressOutline: {
        color: "#D02235",
        height: 10,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderRadius: 5,
        borderWidth: 1,
        margin: 10
    },
    progressFill: {
      height: 10,
      flex: 1,
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
    }
});