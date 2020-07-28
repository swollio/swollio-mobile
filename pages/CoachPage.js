import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../utilities/Colors';
import { getAthletesForTeam } from '../utilities/api'
import Card from '../components/Cards/Card'
import Icon from 'react-native-vector-icons/Feather';

function getFullName(user) {
    return user.first_name.charAt(0).toUpperCase()
         + user.first_name.toLowerCase().slice(1) + ' ' 
         + user.last_name.charAt(0).toUpperCase()
         + user.last_name.toLowerCase().slice(1);
}

export default function CoachPage(props) {

    const [data, setData] = useState(null);
    useEffect(() => {
        if (data == null) 
            getAthletesForTeam(props.user.team_id).then(data => setData(data));
    });

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>{getFullName(props.user)}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: 44, height: 44, marginRight: 12, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: "white"}}>
                        <Text style={[styles.subtitle, {color: Colors.Red}]}>{data == null ? '0': data.length}</Text>
                    </View>
                    <Text style={styles.subtitle}>Athletes</Text>
                </View>
            </View>
            <View style={{marginTop: 10}}>
                {data == null ? 
                    <Text>Loading...</Text>: 
                    data.map((athlete => 
                        <Card key={athlete.id} barColor={Colors.Red}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <View>
                                    <Text style={{fontSize: 18}}>{getFullName(athlete)}</Text>
                                </View>
                                <Icon size={40} color={Colors.Red} name={'chevron-right'}/>
                            </View>
                            
                        </Card>
                    ))
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
        marginBottom: 16, 
    },
    subtitle: {
        fontSize: 24,
        color: Colors.White,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
})