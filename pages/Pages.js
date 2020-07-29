import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import UserPage from './UserPage'
import CoachPage from './CoachPage'
import CoachWorkoutsPage from './CoachWorkoutsPage'
import WorkoutsPage from './WorkoutsPage'
import StatisticsPage from './StatisticsPage'
import PageView from '../containers/PageView'
import Colors from '../utilities/Colors';
import { current_user } from '../utilities/api'

export default function UserPageView(props) {
    const [data, setData] = useState(null);
    useEffect(() => {
        if (data === null)  
            current_user().then(data => setData(data));
    });


    if (data !== null && !data.athlete_id && !data.team_id) {
        props.onNeedsAccountSetup();
    }
    
    return data === null && <View><Text>Loading...</Text></View>
        || data.athlete_id && <AthletePageView user={data} />
        || data.team_id && <CoachPageView user={data} />
        || <View></View>
}

function AthletePageView(props) {
    return (
        <PageView user={props.user} pages={[{
            content: UserPage,
            icon: 'user'
        }, {
            content: WorkoutsPage,
            icon: 'clipboard'
        }, {
            content: StatisticsPage,
            icon: 'bar-chart-2'
        }]} />
    );
}

/**
 * The CoachPageView component is a container which
 * @param props -
 */
function CoachPageView(props) {
    return (
        <PageView user={props.user} pages={[{
            content: CoachPage,
            icon: 'users'
        }, {
            content: CoachWorkoutsPage,
            icon: 'clipboard'
        }, {
            content: StatisticsPage,
            icon: 'bar-chart-2'
        }]} />
    );
}