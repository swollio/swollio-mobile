import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, Text, View, TextInput, Animated, Button, Dimensions, ColorPropType} from 'react-native';
import Colors from '../utilities/Colors';
import { Card, ScrollWheel } from '../components/Components';
import Icon from 'react-native-vector-icons/Feather';

export default function PageView(props) {

    const [pageIndex, switchPage] = useState(0);
    const [stack, setStack] = useState([]);
 
    const currentPage = props.pages[pageIndex]
    const Content = currentPage.content;
    const color = currentPage.color;


    return (
        <>
        <SafeAreaView style={{ flex: 0, backgroundColor: color }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.White}}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                {
                    stack.length === 0 ?
                <>
                    <View style={{flex: 1}}>
                    <Content 
                        push={(x) => setStack([x, ...stack])}
                        pop={() => setStack(stack.slice(1))}
                        user={props.user}
                    />
                    </View>
                    <View style={[styles.navigation, { borderColor: color }]}>
                        {props.pages.map((page, index) => {
                            if (pageIndex == index) {
                                return <Icon key={index} size={40} onPress={() => switchPage(index)} color={Colors.Black} name={page.icon}/>
                            } else {
                                return <Icon key={index} size={40} onPress={() => switchPage(index)} color={Colors.Grey} name={page.icon}/>
                            }
                        })}
                    </View>
                </>
                : stack[0]
                }
            </View>
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.LightGrey,
    },  
    navigation: {
        borderTopWidth: 2,
        backgroundColor: Colors.White,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around'
    },
});