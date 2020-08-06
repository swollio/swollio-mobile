import React, { useState  } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import VerticalScrollPicker from './VerticalScrollPicker'
import Colors from '../utilities/Colors'
import moment from 'moment'

const months = [
    "january", "february", "march",
    "april", "may", "june",
    "july", "august", "september",
    "october", "november", "decemeber"
];

const daysInMonth = (month, year) => {
    const days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month != 1) return days_in_month[month];
    else if (year % 4 !== 0) return days_in_month[month];
    else if (year % 100 !== 0) return 29;
    else return 28;
}

export default function ScrollPicker (props) {
    
    const [month, setMonth] = useState(moment().month())
    const [day, setDay] = useState(moment().date())
    const [year, setYear] = useState(moment().year())

    return (
    <View style={{flexDirection: "row", width: 380, padding: 16, alignItems: "center"}}>
        <VerticalScrollPicker
            data={months}
            width={150}
            initialValue={months[moment().month()]}
            onChange={(x) => {
                setMonth(months.indexOf(x))
                props.onChange(moment().year(year).month(x).date(day).format("YYYY-MM-DD"))
            }}
        />
        <VerticalScrollPicker
            data={[...Array(daysInMonth(month, year)).keys()].map(x => x + 1)}
            width={50}
            initialValue={moment().date()}
            onChange={(x) => {
                setDay(x)
                props.onChange(moment().year(year).month(month).date(x).format("YYYY-MM-DD"))
            }}
        />
        <VerticalScrollPicker
            data={[...Array(10).keys()].map(x => x + moment().year() - 4)}
            width={100}
            initialValue={moment().year()}
            onChange={(x) => {
                setYear(x)
                props.onChange(moment().year(x).month(month).date(day).format("YYYY-MM-DD"))
            }}
        />
    </View>)
}

const styles = StyleSheet.create({
    item: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: Colors.Background
    },
    emptyItem: {
        backgroundColor: Colors.Surface,
    },
    selectedItem: {
        backgroundColor: Colors.Primary
    }
})