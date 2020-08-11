import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../utilities/Colors';
import { getAthletesForTeam } from '../../utilities/api'
import Card from '../../components/Cards/Card'
import Icon from 'react-native-vector-icons/Feather';
import AthletePage from "./AthletePage";
import Tag from '../../components/Tag';

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
                <View style={styles.athleteCount}>
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
            <TouchableOpacity activeOpacity={0.2} onPress={() => props.onPress()}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.athleteText}>{getFullName(props.athlete)}</Text>
                        <View style={{ flexDirection: 'row'}}>
                            <Tag tag="Sprint"/>
                            <Tag tag="Taper"/>
                        </View>
                    </View>
                    <Icon size={40} color={Colors.Primary} name={'chevron-right'}/>
                </View>
            </TouchableOpacity>
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
            {(data || []).map(athlete => 
                <AthleteElement 
                    key={athlete.id} 
                    athlete={athlete} 
                    onPress={() => props.push(() => 
                        <AthletePage 
                            athlete={athlete}
                            pop={props.pop}
                            push={props.push}
                        />)}
                />
            )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 16,
        borderBottomColor: Colors.BackgroundContrast,
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
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
    },
    athleteCount: {
        width: 44, 
        height: 44, 
        marginRight: 12, 
        borderRadius: 22, 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: Colors.PrimaryContrast
    },
    athleteText: {
        fontSize: 20,
        fontFamily: "Comfortaa_600SemiBold",
        marginTop: 5,
        marginBottom: 10,
    }

})