import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";

export default function Calendar(props) {
    const dates = new Set(
        props.date.map((date) => moment.utc(date).format("YYYY-MM-DD")),
    );

    const [currentMonth, setCurrentMonth] = useState(moment().startOf("month"));
    const start_dow = currentMonth.startOf("month").isoWeekday() % 7;
    const end_dow = currentMonth.endOf("month").isoWeekday() % 7;
    const raw_days = [...Array(currentMonth.daysInMonth()).keys()].map(
        (x) => x + 1,
    );
    let cal_days = [
        ...[...Array(start_dow).keys()].map((x) => ""),
        ...raw_days,
        ...[...Array(6 - end_dow).keys()].map((x) => ""),
    ];

    const weeks = [];
    while (cal_days.length) weeks.push(cal_days.splice(0, 7));

    const isCurrentDay = (x) => {
        const input_date = moment(currentMonth)
            .startOf("month")
            .add(x - 1, "days");
        return moment().format("YYYY-MM-DD") === input_date.format("YYYY-MM-DD");
    };

    const isSelectedDay = (x) => {
        const input_date = moment(currentMonth)
            .startOf("month")
            .add(x - 1, "days");
        const isSelected = dates.has(input_date.format("YYYY-MM-DD"));
        return isSelected;
    };

    const isPastDate = (x) => {
        const input_date = moment(currentMonth)
            .startOf("month")
            .add(x - 1, "days");
        return input_date.isBefore(moment().startOf("day"));
    };

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <Icon
                    size={24}
                    style={{padding: 16}}
                    onPress={() =>
                        setCurrentMonth(moment(currentMonth).subtract(1, "month"))
                    }
                    name="angle-left"
                />
                <Text style={styles.monthText}>{currentMonth.format("MMMM YYYY")}</Text>
                <Icon
                    size={24}
                    style={{padding: 16}}
                    onPress={() => setCurrentMonth(moment(currentMonth).add(1, "month"))}
                    name="angle-right"
                />
            </View>
            <View style={{alignItems: "center"}}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}>
                    {["Su", "M", "Tu", "W", "Th", "F", "Sa"].map((day, i) => (
                        <View key={i} style={styles.calendarItem}>
                            <Text key={day} style={{textAlign: "center"}}>
                                {day}
                            </Text>
                        </View>
                    ))}
                </View>
                {weeks.map((week, i) => (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                        }}
                        key={i}>
                        {week.map((x, i) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    (isCurrentDay(x) && styles.todayCalendarItem) || {},
                                    (isSelectedDay(x) && styles.selectedCalendarItem) || {},
                                    styles.calendarItem,
                                ]}
                                key={i}
                                onPress={() => {
                                    if (isPastDate(x)) return;
                                    if (x === "") return;
                                    const date = moment(currentMonth)
                                        .startOf("month")
                                        .add(x - 1, "days")
                                        .format("YYYY-MM-DD");

                                    if (dates.has(date)) {
                                        dates.delete(date);
                                    } else {
                                        dates.add(date);
                                    }
                                    props.onEdit(Array.from(dates));
                                }}>
                                {isPastDate(x) ? (
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: isSelectedDay(x) ? Colors.PrimaryContrast : "#BBB",
                                        }}>
                                        {x === "" ? "-" : x}
                                    </Text>
                                ) : (
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: isSelectedDay(x)
                                                ? Colors.PrimaryContrast
                                                : Colors.SurfaceContrast,
                                        }}>
                                        {x === "" ? "-" : x}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    monthText: {
        fontFamily: Fonts.Header,
        fontSize: 20,
    },
    calendarItem: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
    },
    todayCalendarItem: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        backgroundColor: Colors.Background,
    },
    selectedCalendarItem: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        backgroundColor: Colors.Primary,
    },
});
