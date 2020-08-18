import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

import Card from '../../components/Cards/Card'
import Colors from '../../utilities/Colors';
import ScrollPicker from '../../components/ScrollPicker'
import OutlinedButton from '../../components/OutlinedButton'

function AssignmentSetInfoButton(props) {
    return (
        <TouchableOpacity 
            onPress={props.onPress}
            style={[
                styles.setInfoButton,
                {backgroundColor: props.reps === 0 ? '#EEE': Colors.Primary},
            ]}
        >
            <Text style={{
                fontSize: props.reps === 0 ? 14: 18,
                textAlign: 'center',
                color: props.reps === 0 ? '#CCC': Colors.PrimaryContrast,
            }}>
                {props.reps === 0 ? `Set ${props.index + 1}`: props.reps}
            </Text>
        </TouchableOpacity>
    )
}

function AssignmentSetInfo(props) {
    return (
        <View style={[{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        }, props.style]}>
            {props.sets.map((reps, i) => 
                <AssignmentSetInfoButton index={i} onPress={() => props.onEdit(i)} reps={reps}/>
            )}
        </View>
    )
}

/**
 * AssignmentDataCard displays the assignment details including the name
 * of the exercise, and the number of sets/reps that the athlete should
 * complete. This may be extended later to include other assignment options.
 * 
 * @param onEdit
 */
function AssignmentDataCard(props) {
    return (
        <Card>
            <Text style={styles.assignmentTitle}>{props.assignment.name}</Text>
            <AssignmentSetInfo
                style={{marginVertical: 16}}
                onEdit={props.onEdit}
                sets={props.assignment.rep_count}
            />
        </Card>
    );
}

/**
 * AssignmentEditCard displays a scroll-picker allowing coaches to set the
 * number of reps that should be completed for a specific set.
 * 
 * @param onCompleted
 */
function AssignmentEditCard(props) {
    return (
        <Card>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Text style={styles.assignmentTitle}>Edit Rep Count</Text>
                <OutlinedButton 
                    style={{width: 'auto', height: 40, paddingHorizontal: 16}}
                    text={'Remove Set'}
                    onPress={() => {
                        props.onChange(0);
                        props.onCompleted();
                    }}
                />
            </View>
            <Text style={styles.assignmentBody}>This value indicates the number of each exercise that the athlete should complete</Text>
            <View style={{alignItems: 'center', padding: 16}}>
                <ScrollPicker 
                    style={{marginVertical: 16}}
                    initialValue={props.initialValue || 10} 
                    onChange={props.onChange}
                    data={[...Array(100).keys()].map(x => x)}
                />
                <OutlinedButton onPress={props.onCompleted} text={'Set Rep Count'} />
            </View>
        </Card>
    );
}

/**
 * AssignmentCard displays an editable assignment component displaying an
 * exercise name and set series of sets/reps that the athlete should complete.
 * 
 * @param assignment - the assignment to edit
 * @param onDelete - callback to delete the assignment
 * @param onUpdate - callback to update the assignment
 */
export default function AssignmentCard(props) {

    // edited contains the index of the set that is currently being edited,
    // or null if no set is being edited.
    const [edited, setEdited] = useState(null);

    return edited === null ?
    <AssignmentDataCard 
        assignment={props.assignment}
        onEdit={(i) => setEdited(i)}
    />:
    <AssignmentEditCard 
        assignment={props.assignment}
        initialValue={props.assignment.rep_count[edited]}
        onChange={(i) => {
            props.assignment.rep_count[edited] = i;
            props.onUpdate({...props.assignment})
        }}
        onCompleted={() => {
            const updated_rep_counts = [];

            for (let i = 0; i < 5; i++) {
                const current_reps = props.assignment.rep_count[i];
                if (current_reps !== 0) {
                    updated_rep_counts.push(current_reps);
                }
            }

            while (updated_rep_counts.length < 5) {
                updated_rep_counts.push(0);
            }
           
            console.log(updated_rep_counts)

            props.assignment.rep_count = updated_rep_counts;
            props.onUpdate({...props.assignment})
            setEdited(null)
        }}
    />;
}

const styles = StyleSheet.create({
    setInfoButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    assignmentTitle: {
        fontSize: 20,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'left',
    },
    assignmentBody: {
        fontSize: 16,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'left',
        marginTop: 16,
    }
});