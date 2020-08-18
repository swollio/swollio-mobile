import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Colors from '../../utilities/Colors';
import { getAthletesForTeam, getStatisticsForAthlete } from '../../utilities/api'
import { DataCard } from "../../components/Components"
import Icon from 'react-native-vector-icons/Feather';
import AthleteSettings from './AthleteSettings';
import WorkoutDetailsItem from './WorkoutDetailsItem'

import headerStyles from '../styles/Header'


function Header(props) {
    return (
        <View style={headerStyles.container}>
            <View style={headerStyles.header}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Icon
                        name={'arrow-left'}
                        style={headerStyles.text}
                        onPress={props.pop}
                        size={36}
                    />             
                    <Text style={headerStyles.title}>
                        {`${props.athlete.first_name}`}
                    </Text>
                    <Icon
                        name={"settings"}
                        style={headerStyles.text}
                        size={36}

                        onPress={() => props.push(() => 
                            <AthleteSettings 
                                teamId={props.teamId}
                                athlete={props.athlete}
                                pop={props.pop}
                                push={props.push}
                            />
                            )}
                    />
                </View>
            </View>
            <View style={{padding: 8}}>
            {props.athleteData &&
                <View>
                    <WorkoutDetailsItem icon='user' value={props.athleteData.first_name + ' ' + props.athleteData.last_name}  />
                    <WorkoutDetailsItem icon='ruler' value={(props.athleteData.height / 12) + ' feet'}  />
                    <WorkoutDetailsItem icon='balance-scale' value={(props.athleteData.weight) + ' lbs'}  />
                </View>
                || <></>
                } 
            </View>

        </View>
        
    );
}

export default function (props) {

    const [weightSeries, setWeightSeries] = useState(null);

    useEffect(() => {
        if (weightSeries === null) {
            getStatisticsForAthlete(props.athlete.id).then(data =>
                setWeightSeries(data)
            );
        }
    });

    const dataCards = (weightSeries || []).map((e, index) => {
        return (
            <DataCard 
            key={index}
            exercise_name={e.exercise_name}
            data={e.weight_series.map(x => ({
                value: x.avg_weight,
                date: new Date(x.date)
            }))}/>
        )
    })

    return (
        <SafeAreaView style={headerStyles.safeAreaTop}>
            <View style={{
                backgroundColor: Colors.Background,
                height: "100%"
            }}>
                <Header {...props} athleteData={props.athlete}/>
                <ScrollView padding={10} style={{backgroundColor: Colors.Background, height: '100%'}}>
                    {dataCards}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaTop: {
        flex: 0,
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        marginLeft: 10,
        textAlign: 'center',
        flex: 1
    },
    headerIcon: {
        fontSize: 30,
        color: Colors.PrimaryContrast,
    },
});