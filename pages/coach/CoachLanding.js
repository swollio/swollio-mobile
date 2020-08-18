import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import Colors from '../../utilities/Colors';
import { getAthletesForTeam, getTeamData } from '../../utilities/api'
import Card from '../../components/Cards/Card'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AthletePage from "./AthletePage";
import Tag from '../../components/Tag';
import WorkoutDetailsItem from './WorkoutDetailsItem'
import { SolidButton, WaterMark } from '../../components/Components'
import headerStyles from '../styles/Header'
import Popup from '../../components/Popup';

function getFullName(user) {
    return user.first_name.charAt(0).toUpperCase()
         + user.first_name.toLowerCase().slice(1) + ' ' 
         + user.last_name.charAt(0).toUpperCase()
         + user.last_name.toLowerCase().slice(1);
}

function Header(props) {
    return (
        <View style={headerStyles.container}>
            <View style={headerStyles.header}>
                <Text style={headerStyles.title}>{getFullName(props.user)}</Text>
                <Text style={headerStyles.subtitle}>Head Coach</Text>
            </View>
            <View>
            {props.teamData &&
                <View>
                    <WorkoutDetailsItem icon='users' value={props.teamData.name} />
                    <WorkoutDetailsItem icon='dumbbell' value={props.teamData.sport} />
                </View>
                || <></>
                } 
            </View>

        </View>
        
    );
}

function AthleteElement(props) {
    
    let tags= [];
    // The array of all the tags an athlete has for a given team
    if (props.athlete.tags[0] !== null)
        tags = props.athlete.tags.map((tag, index) => <Tag key={index} tagStyle={{ marginTop: 5, marginBottom: 5}} tag={tag} />);
    
    return (
        <Card barColor={Colors.Primary}>
            <TouchableOpacity activeOpacity={0.2} onPress={() => props.onPress()}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.athleteText}>{getFullName(props.athlete)}</Text>
                        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <View style={{ width: "93%", flexDirection: 'row', flexWrap:'wrap'}}>
                                {tags}
                            </View>
                        </View>                        
                    </View>
                    <Icon name={'chevron-right'} size={36} color={Colors.Primary} />
                </View>
            </TouchableOpacity>
        </Card>
    )
}

export default function CoachPage(props) {

    const [data, setData] = useState(null);
    const [showPin, setShowPin] = useState(false);
    const [teamData, setTeamData] = useState(null);

    useEffect(() => {
        if (data === null) {
            getAthletesForTeam(props.user.team_id).then(data => setData(data));
        }

        if (teamData === null) {
            getTeamData(props.user.team_id).then(data => setTeamData(data));
        }
    });

    return (
        <>
            <Header user={props.user} teamData={teamData} onPress={() => setShowPin(true)}/>
            <Popup 
                toggle={showPin} 
                style={{borderTopWidth: 10, borderTopColor: Colors.Primary}}
                dismissModal={() => setShowPin(false)}
            >
                <Icon 
                    name={"user-plus"}
                    style={styles.popupIcon}
                />
                <Text style={styles.popupHeader}>{props.user.pin}</Text>
                <Text style={styles.popupText}>This is your team pin. Give it to your athletes so that they can join the team!</Text>
            </Popup>
            {
                (data === null && <WaterMark title={'Loading'} />) ||
                (data.length === 0 && 
                    <WaterMark title={'No Athletes'}>
                        <Text style={{fontSize: 16, textAlign: 'center', padding: 24, color: Colors.SurfaceContrast2}}>Instruct your athletes to enter the following team pin during signup</Text>
                        <View style={{flexDirection: 'row'}}>
                        {teamData && teamData.pin.toString().split('').map((x, i) => 
                            <View key={i} style={{padding: 8, backgroundColor: Colors.Surface, margin: 2, borderRadius: 8}}>
                                <Text style={{fontSize: 28, color: Colors.SurfaceContrast2}} key={i}>{x}</Text>
                            </View>
                        )}
                        </View>
                    </WaterMark>) ||
                <ScrollView padding={10} style={{height: '100%'}}>
                    {data.map(athlete => 
                        <AthleteElement 
                            key={athlete.id} 
                            athlete={athlete} 
                            onPress={() => props.push(() => 
                                <AthletePage
                                    teamId={props.user.team_id}
                                    athlete={athlete}
                                    pop={props.pop}
                                    push={props.push}
                                />
                            )}
                        />
                    )}
                </ScrollView>
            }
            { !showPin ? 
                <View style={styles.addAthletePosition}>
                    <SolidButton
                        text="Add Athlete"
                        style={{width: 130, height: 45}}
                        onPress={() => setShowPin(true)} 
                    />
                </View> : <></>
            }
        </>
    );
}

const styles = StyleSheet.create({
  
    headerIcon: {
        fontSize: 36,
        color: Colors.Primary,
    },
    athleteText: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Comfortaa_300Light',
        color: Colors.SurfaceContrast,
        textAlign: 'left',
    },
    popupHeader: {
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'Comfortaa_700Bold',
        color: Colors.Primary,
    },
    popupText: {
        fontFamily: 'Comfortaa_600SemiBold',
        fontSize: 20,
        color: Colors.SurfaceContrast,
        marginHorizontal: 10,
        marginVertical: 10,
        textAlign: 'center'
    },
    popupIcon: {
        fontSize: 48,
        marginBottom: 20,
        marginLeft: 10
    },
    addAthletePosition: {
        padding: 15, 
        position: 'absolute', 
        alignItems: 'flex-end', 
        width: 250, 
        right: 0, 
        bottom: 0
    }
})
