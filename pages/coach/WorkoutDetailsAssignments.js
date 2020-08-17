import React from 'react';
import { ScrollView, StyleSheet, View, Text} from "react-native"
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../utilities/Colors';
import WaterMark from '../../components/WaterMark'

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
        (props.assignments === null && <WaterMark title={'Loading'} />) ||
        (props.assignments.length === 0 && 
            <WaterMark title={"This workout is empty"}>
                <Text style={{fontSize: 16, textAlign: 'center', padding: 24, color: Colors.SurfaceContrast2}}>Add exercises to this workout to get started. You will be able to choose from a list of curated exercises, or create your own! </Text>
            </WaterMark>) ||
        <ScrollView style={{paddingBottom: 100}}>
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