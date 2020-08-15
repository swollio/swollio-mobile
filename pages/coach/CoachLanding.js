import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../utilities/Colors';
import { getAthletesForTeam, getTeamData } from '../../utilities/api'
import Card from '../../components/Cards/Card'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AthletePage from "./AthletePage";
import Tag from '../../components/Tag';
import WorkoutDetailsItem from './WorkoutDetailsItem'

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
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.athleteText}>{getFullName(props.athlete)}</Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{ maxWidth: "90%", flexDirection: 'row', flexWrap:'wrap', justifyContent: 'flex-start'}}>
                                {tags}
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name={'chevron-right'} size={40} color={Colors.Primary} style={{justifyContent: 'flex-end'}} />
                            </View>
                        </View>
                        
                    </View>
                </View>
            </TouchableOpacity>
        </Card>
    )
}

export default function CoachPage(props) {

    const [data, setData] = useState(null);
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

    return (
        <View>
            <Header user={props.user} teamData={teamData}/>
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
        </View>
    );
}
