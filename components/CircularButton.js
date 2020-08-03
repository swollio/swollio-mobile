import React from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native'
import Colors from '../utilities/Colors'
import Icon from 'react-native-vector-icons/Feather';

export default function CircularButton(props) {
    return (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onPress}
        style={styles.circularButton}
    >
        <Icon
            name={props.icon}
            style={styles.circularButtonIcon}
            color={Colors.PrimaryContrast}
        />
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    circularButtonIcon: {
        fontSize: 30,
        color: Colors.PrimaryContrast
    },
    circularButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.Primary,
    }
})