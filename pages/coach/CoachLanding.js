import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import Colors from '../../utilities/Colors';
import { getAthletesForTeam, getTeamData } from '../../utilities/api'
import Card from '../../components/Cards/Card'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AthletePage from "./AthletePage";
import Tag from '../../components/Tag';
import WorkoutDetailsItem from './WorkoutDetailsItem'
import WaterMark from '../../components/WaterMark'

import headerStyles from '../styles/Header'

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
            <View style={{padding: 8}}>
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
                            <View style={{ maxWidth: "90%", flexDirection: 'row', flexWrap:'wrap'}}>
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
    });

    useEffect(() => {
        if (teamData === null) {
            getTeamData(props.user.team_id).then(data => setTeamData(data));
        }
    });

    function PinView () {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={showPin}
                onRequestClose={() => setShowPin(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setShowPin(false)}>
                        <View style={styles.centeredView}>
                            <TouchableWithoutFeedback onPress={() => {}}>
                                <View style={styles.modalView}>
                                    <Text style={styles.pinText}>Team pin:</Text>
                                    <Text style={[styles.athleteText, { alignSelf: 'center', fontSize: 30}]}>{props.user.pin}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback> 
            </Modal>
            
        );
    }

    return (
        <>
            <Header user={props.user} teamData={teamData} onPress={() => setShowPin(true)}/>
            {showPin ? <PinView /> : <></>}
            {
                (data === null && <WaterMark title={'Loading'} />) ||
                (data.length === 0 && 
                    <WaterMark title={'No Athletes'}>
                        <Text style={{fontSize: 16, textAlign: 'center', padding: 24, color: Colors.SurfaceContrast2}}>Instruct your athletes to enter the following team pin during signup</Text>
                        <View style={{flexDirection: 'row'}}>
                        {teamData && teamData.pin.toString().split('').map((x, i) => 
                            <View style={{padding: 8, backgroundColor: Colors.Surface, margin: 2, borderRadius: 8}}>
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

        </>
    );
}

const styles = StyleSheet.create({
  
    headerIcon: {
        fontSize: 36,
        color: Colors.PrimaryContrast,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 10,
        alignContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
    pinText: {
        fontFamily: 'Comfortaa_600SemiBold',
        fontSize: 26,
        color: Colors.Primary,
        marginHorizontal: 10,
        marginVertical: 5
    },
    athleteText: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Comfortaa_300Light',
        color: Colors.SurfaceContrast,
        textAlign: 'left',
    },
})
