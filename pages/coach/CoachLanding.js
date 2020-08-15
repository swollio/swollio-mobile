import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
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
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.athleteCount}>
                        <Text style={[styles.subtitle, {color: Colors.Red}]}>
                            {props.data === null ? '0': props.data.length}
                        </Text>
                    </View>
                <Text style={[styles.subtitle, { fontSize: 28 }]}>Athletes</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                <Icon 
                    name={"plus"}
                    style={styles.headerIcon}
                    onPress={props.onPress}
                />
                </View>
            </View>
            || <></>
            }
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
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.athleteText}>{getFullName(props.athlete)}</Text>
                        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <View style={{ maxWidth: "90%", flexDirection: 'row', flexWrap:'wrap'}}>
                                {tags}
                            </View>
                            <Icon name={'chevron-right'} size={40} color={Colors.Primary} />
                        </View>
                        
                    </View>
                </View>
            </TouchableOpacity>
        </Card>
    )
}

export default function CoachPage(props) {

    const [data, setData] = useState(null);
    const [showPin, setShowPin] = useState(false);
    
    useEffect(() => {
        if (data === null) {
            getAthletesForTeam(props.user.team_id).then(data => setData(data));
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
            <Header user={props.user} data={data} onPress={() => setShowPin(true)}/>
            {showPin ? <PinView /> : <></>}
            <ScrollView padding={10} style={{height: '100%'}}>
            {(data || []).map(athlete => 
                <AthleteElement 
                    key={athlete.id} 
                    athlete={athlete} 
                    onPress={() => props.push(() => 
                        <AthletePage
                            teamId={props.user.team_id}
                            athlete={athlete}
                            pop={props.pop}
                            push={props.push}
                        />)}
                />
            )}
            </ScrollView>
        </>
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
        width: 38, 
        height: 38, 
        marginRight: 12, 
        borderRadius: 19, 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: Colors.PrimaryContrast
    },
    athleteText: {
        fontSize: 24,
        fontFamily: "Comfortaa_600SemiBold",
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 5
    },
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
    }
})