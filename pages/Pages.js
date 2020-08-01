import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import StackContainer from './StackContainer'
import AthletePage from './athletes/UserPage'
import CoachPage from './coach/AthletesPage'
import CoachWorkoutsPage from './coach/WorkoutsPage'
import AthleteWorkoutsPage from './athletes/WorkoutsPage'
import StatisticsPage from './StatisticsPage'
import PageView from '../containers/PageView'

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
        
    if (data === null) {
        return <View><Text>Loading...</Text></View>
    } else if (data.athlete_id !== null) {
        return <StackContainer rootView={(props) => <AthletePageView {...props} user={data} />} />
    } else if (data.team_id !== null) {
        return <StackContainer rootView={(props) => <CoachPageView {...props} user={data} />} />
    }
}

function AthletePageView(props) {
    return (
        <PageView {...props} pages={[{
            content: AthletePage,
            icon: 'user'
        }, {
            content: AthleteWorkoutsPage,
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
        <PageView {...props} pages={[{
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