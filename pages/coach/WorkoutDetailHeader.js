import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Text, View, StyleSheet} from 'react-native';

import WorkoutDetailsItem from './WorkoutDetailsItem'
import Colors from '../../utilities/Colors';

/**
 * WorkoutDetailsHeader is a header component for displaying workout details.
 * It displays navigation icons ('back' and 'finish') as well as information
 * about a workout such as the date, the repeat status, etc. Future metadata
 * about a workout such as primary muscle groups should be displayed here as
 * well.
 * 
 * PropType:
 * - onBack: () => () 
 * - onFinish: () => ()
 * - options: { created: string, repeat: string }
 */
export default function WorkoutDetailsHeader(props) {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <Icon 
                    name={'arrow-left'}
                    style={styles.headerIcon}
                    onPress={props.onBack}
                />
                <Text style={styles.headerText}>Details</Text>
                <Icon 
                    name={'check'}
                    style={styles.headerIcon}
                    onPress={props.onFinish}
                />
            </View>
            <WorkoutDetailsItem icon={'calendar'} value={props.options.start_date}/>
            <WorkoutDetailsItem icon={'repeat'} value={props.options.repeat.join(" ")}/>
        </View>
        
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        padding: 16,
        borderColor: Colors.Primary,
        borderBottomWidth: 1,
        backgroundColor: Colors.Surface,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,     
    },
    headerIcon: {
        fontSize: 30,
        color: Colors.SurfaceContrast,
    },
    headerText: {
        fontSize: 24,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
});

