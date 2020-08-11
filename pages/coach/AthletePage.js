import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Colors from '../../utilities/Colors';
import { getAthletesForTeam, getStatisticsForAthlete } from '../../utilities/api'
import { DataCard } from "../../components/Components"
import Icon from 'react-native-vector-icons/Feather';

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
        <SafeAreaView style={styles.safeAreaTop}>
            <View style={{
                backgroundColor: Colors.Background,
                height: "100%"
            }}>
                <View style={styles.header}>
                    <Icon
                        name={'arrow-left'}
                        style={styles.headerIcon}
                        onPress={props.pop}
                    />
                    <Text style={styles.title}>
                        {`${props.athlete.first_name}'s Progress`}
                    </Text>
                </View>
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
        textAlign: 'center',
        marginLeft: 10
    },
    headerIcon: {
        fontSize: 30,
        color: Colors.PrimaryContrast,
    },
});