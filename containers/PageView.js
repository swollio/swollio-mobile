import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, Text, View, TextInput, Animated, Button, Dimensions, ColorPropType} from 'react-native';
import Colors from '../utilities/Colors';
import { Card, ScrollWheel } from '../components/Components';
import Icon from 'react-native-vector-icons/Feather';
import { current_user } from '../utilities/api'

export default function PageView(props) {

    const [pageIndex, switchPage] = useState(0);
    const [data, setData] = useState(null);
    
    useEffect(() => {
        if (data == null)
            current_user().then( data => setData(data) );
    });

    const currentPage = props.pages[pageIndex]
    const Content = data ? currentPage.content: () => <Text>Loading...</Text>;
    const color = currentPage.color;

    return (
        <>
        <SafeAreaView style={{ flex: 0, backgroundColor: color }} />
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                {
                    <View style={{flex: 1}}>
                        <Content user={data}></Content>
                    </View>
                }
                <View style={[styles.navigation, { borderColor: color }]}>
                    {props.pages.map((page, index) => {
                        if (pageIndex == index) {
                            return <Icon key={index} size={40} onPress={() => switchPage(index)} color={Colors.Black} name={page.icon}/>
                        } else {
                            return <Icon key={index} size={40} onPress={() => switchPage(index)} color={Colors.Grey} name={page.icon}/>
                        }
                    })}
                </View>
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