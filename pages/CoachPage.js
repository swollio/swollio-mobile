import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../utilities/Colors';
import { getAthletesForTeam } from '../utilities/api'
import Card from '../components/Cards/Card'

export default function CoachPage(props) {

    const [data, setData] = useState(null);
    useEffect(() => {
        if (data == null) 
            getAthletesForTeam(props.user.team_id).then(data => setData(data));
    });

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Hello, Coach {props.user.last_name}!</Text>
            </View>
            <View style={{margin: 10}}>
                {data == null ? 
                    <Text>Loading...</Text>: 
                    data.map(athlete => 
                        <Card barColor={Colors.Red}>
                            <Text>{athlete.first_name + ' ' + athlete.last_name}</Text>
                        </Card>
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 15,
        paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: Colors.Red,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: {
        fontSize: 32,
        color: Colors.White,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
})