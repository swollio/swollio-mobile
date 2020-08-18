import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../utilities/Colors'

export default function Calendar(props) {


    const [currentMonth, setCurrentMonth] = useState(moment().startOf("month"));
    const start_dow = currentMonth.startOf('month').isoWeekday() % 7;
    const end_dow = currentMonth.endOf('month').isoWeekday() % 7;
    const raw_days = [...Array(currentMonth.daysInMonth()).keys()].map(x => x + 1)
    let cal_days = [...[...Array(start_dow).keys()].map(x => ''), ...raw_days, ...[...Array(6 - end_dow).keys()].map(x => '')];

    const weeks = [];
    while(cal_days.length) weeks.push(cal_days.splice(0, 7));
      
    const isCurrentDay = (x) => {
        const input_date = moment(currentMonth).startOf("month").add(x - 1, 'days')
        return moment().format("YYYY-MM-DD") == input_date.format("YYYY-MM-DD")
    }

    const isSelectedDay = (x) => {
        const input_date = moment(currentMonth).startOf("month").add(x - 1, 'days')
        return props.date.has(input_date.format("YYYY-MM-DD"));
    }
    
    return (
        <View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
            }}>
                <Icon size={24} style={{padding: 16}} onPress={() => setCurrentMonth(moment(currentMonth).subtract(1, 'month'))} name='angle-left' />
                <Text style={styles.monthText}>{currentMonth.format('MMMM YYYY')}</Text>
                <Icon size={24} style={{padding: 16}} onPress={() => setCurrentMonth(moment(currentMonth).add(1, 'month'))} name='angle-right' />
            </View>
            <View >
            {
                weeks.map((week, i) => 
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}} key={i}>
                        {
                            week.map((x, i) => 
                                <TouchableOpacity 
                                    style={[
                                        (isCurrentDay(x) && styles.todayCalendarItem) || {},
                                        (isSelectedDay(x) && styles.selectedCalendarItem) || {},
                                        styles.calendarItem
                                    ]}
                                    key={i}
                                    onPress={() => {
                                        if (x !== '') {
                                            props.onToggleDate(moment(currentMonth).startOf("month").add(x - 1, 'days'))
                                        }
                                    }}
                                >
                                    <Text style={{textAlign: 'center', color: isSelectedDay(x) ? Colors.PrimaryContrast: Colors.SurfaceContrast}}>{x}</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                )
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    monthText: {
        fontFamily: 'Comfortaa_400Regular',
        fontSize: 20,
    },
    calendarItem: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    todayCalendarItem: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: Colors.Background
    },
    selectedCalendarItem: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: Colors.Primary
    }
})