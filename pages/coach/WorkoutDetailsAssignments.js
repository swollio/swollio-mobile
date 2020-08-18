import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native"
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../utilities/Colors';
import WaterMark from '../../components/WaterMark'
import Card from '../../components/Cards/Card'
import SolidButton from '../../components/SolidButton';

function capitalize(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}


function Assignment(props) {
    const [editSets, setEditSets] = useState(false);

    return (
        <Card style={{padding: 8, width: '100%'}}>
            <View style={{flexDirection: 'row', padding: 8, justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={styles.assignmentText}>{capitalize(props.assignment.name)}</Text>
                <Icon size={30} name={'x'} />
            </View>
            {
                editSets ? 
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                { 
                
                    props.assignment.rep_count.map((x, i) => 
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 8,
                        borderTopWidth: 1, 
                        borderColor: '#DDD'
                    }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{width: 120, height: 50, margin: 8, alignItems: 'center', justifyContent: 'center', borderColor: Colors.Primary, borderWidth: 1, borderRadius: 25}}>
                                <Text style={{color: Colors.Primary, fontSize: 18}}>{x} reps</Text>
                            </View>
                        </View>
                        <Icon size={26} name={'x'} />
                    </View>
                    ) 
                }
                <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 8,
                        borderTopWidth: 1, 
                        borderColor: '#DDD'
                    }}>
                        <View style={{width: 50, height: 50, margin: 8, alignItems: 'center', justifyContent: 'center', borderColor: Colors.Primary, borderWidth: 1, borderRadius: 25}}>
                            <Icon size={24} style={{color: Colors.Primary}} name={'plus'}></Icon>
                        </View>
                    </View>
                <SolidButton style={{width: 'auto', paddingHorizontal: 36}} onPress={() => setEditSets(false)} text={'Finish'}></SolidButton>
            </View>:
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
             
             <Text style={{color: Colors.Primary, fontSize: 18}}></Text>

                { 
                
                    [... Array(5)].map((_, i) => 
                        i < props.assignment.rep_count.length || props.assignment.rep_count[i] == 0 ?
                        <TouchableOpacity onPress={() => setEditSets(true)} style={{flexDirection: 'row', width: 50, height: 50, margin: 8, alignItems: 'center', justifyContent: 'center', borderColor: Colors.Primary, borderWidth: 1, borderRadius: 25}}>
                            <Text style={{color: Colors.Primary, fontSize: 20}}>{props.assignment.rep_count[i]}</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => setEditSets(true)} style={{flexDirection: 'row', width: 50, height: 50, margin: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DDD', borderRadius: 25}}>
                        </TouchableOpacity>
                        
                    ) 
                }

            </View>
            }
        </Card>
    )
}


export default function WorkoutDetailsAssignments(props) {
    return (
        (props.assignments === null && <WaterMark title={'Loading'} />) ||
        (props.assignments.length === 0 && 
            <WaterMark title={"This workout is empty"}>
                <Text style={{fontSize: 16, textAlign: 'center', padding: 24, color: Colors.SurfaceContrast2}}>Add exercises to this workout to get started. You will be able to choose from a list of curated exercises, or create your own! </Text>
            </WaterMark>) || (
        <View style={{width: '100%', flex: 1, backgroundColor: Colors.Background}}>
            <ScrollView contentContainerStyle={{padding: 8}} style={{paddingBottom: 100}}>
                {props.assignments.map((a, i) =>
                    <Assignment key={i} assignment={a} />
                )}
            </ScrollView>
        </View>)
    )
}

const styles = StyleSheet.create({
    assignmentIcon: {
        fontSize: 18,
        color: Colors.SurfaceContrast,
    },
    assignmentText
    : {
        fontSize: 24,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'left',
        marginBottom: 15
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