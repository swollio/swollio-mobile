import React from 'react';
import UserPage from './UserPage'
import WorkoutsPage from './WorkoutsPage'
import StatisticsPage from './StatisticsPage'
import PageView from '../containers/PageView'
import Colors from '../utilities/Colors';

export default function UserPageView(props) {
    return (
        <PageView pages={[{
            content: UserPage,
            color: Colors.Red,
            icon: 'user'
        }, {
            content: WorkoutsPage,
            color: Colors.Green,
            icon: 'clipboard'
        }, {
            content: StatisticsPage,
            color: Colors.Purple,
            icon: 'bar-chart-2'
        }]} />
    );
}