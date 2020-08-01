import React from 'react';
import { ScrollView, StyleSheet, View, Text} from "react-native"
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../utilities/Colors';

function Assignment(props) {
    return (
        <View style={styles.assignment}>
            <Text style={styles.assignmentText}>{props.assignment.name}</Text>
            <Icon name={'more-horizontal'} style={styles.assignmentIcon}/>
        </View>
    )
}


export default function WorkoutDetailsAssignments(props) {
    return (
        <ScrollView style={{width: '100%', paddingBottom: 100}}>
            {props.assignments.map((a, i) =>
                <Assignment key={i} assignment={a} />
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    assignmentIcon: {
        fontSize: 18,
        color: Colors.SurfaceContrast,
    },
    assignmentText: {
        fontSize: 18,
        color: Colors.SurfaceContrast,
    },
    assignment: {
        flexDirection: 'row',
        padding: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderColor: '#EEEEEE',
        borderBottomWidth: 1,
    },
})