import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../../utilities/Colors';
import { getAthletesForTeam } from '../../utilities/api'
import Card from '../../components/Cards/Card'
import Icon from 'react-native-vector-icons/Feather';

function getFullName(user) {
    return user.first_name.charAt(0).toUpperCase()
         + user.first_name.toLowerCase().slice(1) + ' ' 
         + user.last_name.charAt(0).toUpperCase()
         + user.last_name.toLowerCase().slice(1);
}

function Header(props) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{getFullName(props.user)}</Text>
            {props.data &&
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 44, height: 44, marginRight: 12, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: "white"}}>
                    <Text style={[styles.subtitle, {color: Colors.Red}]}>{props.data === null ? '0': props.data.length}</Text>
                </View>
                <Text style={styles.subtitle}>Athletes</Text>
            </View>
            || <></>
            }
        </View>
    );
}

function AthleteElement(props) {
    return (
        <Card barColor={Colors.Primary}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View>
                    <Text style={{fontSize: 18}}>{getFullName(props.athlete)}</Text>
                </View>
                <Icon size={40} color={Colors.Primary} name={'chevron-right'}/>
            </View>
        </Card>
    )
}

export default function CoachPage(props) {

    const [data, setData] = useState(null);
    useEffect(() => {
        if (data === null) 
            getAthletesForTeam(props.user.team_id).then(data => setData(data));
    });

    return (
        <View>
            <Header user={props.user} data={data}/>
            <ScrollView padding={10} style={{height: '100%'}}>
            {(data || []).map(athlete => <AthleteElement key={athlete.id} athlete={athlete} />)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 16,
        borderBottomWidth: 3,
        borderBottomColor: Colors.BackgroundContrast,
        backgroundColor: Colors.Primary,
    },
    title: {
        fontSize: 32,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
        marginBottom: 16, 
    },
    subtitle: {
        fontSize: 24,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
})