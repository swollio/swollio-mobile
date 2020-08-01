import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, Text, View, TextInput, Animated, Button, Dimensions, ColorPropType} from 'react-native';
import Colors from '../utilities/Colors';
import { Card, ScrollWheel } from '../components/Components';
import Icon from 'react-native-vector-icons/Feather';

function Navigation(props) {
    return (
    <View style={styles.navigation}>
        {props.pages.map((page, index) => {
            if (props.currentIndex == index) {
                return <Icon key={index} size={40} name={page.icon}/>
            } else {
                return <Icon key={index} size={40} onPress={() => props.onSwitchPage(index)} color={Colors.SurfaceContrast2} name={page.icon}/>
            }
        })}
    </View>);
}

export default function PageView(props) {

    const [pageIndex, switchPage] = useState(0);
    const currentPage = props.pages[pageIndex]
    const Content = currentPage.content;

    return (
        <>
            <SafeAreaView style={styles.safeAreaTop} />
            <SafeAreaView style={styles.safeAreaBottom}>
                <StatusBar barStyle="light-content" />
                <View style={styles.container}>
                   
                        <>
                            <View  style={{flex: 1}}>
                                <Content {...props}/>
                            </View>
                            <Navigation
                                currentIndex={pageIndex}
                                onSwitchPage={switchPage}
                                pages={props.pages}
                            />
                        </>
     
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeAreaTop: {
        flex: 0,
        backgroundColor: Colors.Primary
    },
    safeAreaBottom: {
        flex: 1,
        backgroundColor: Colors.Surface,
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.Background,
    },  
    navigation: {
        borderTopWidth: 2,
        borderColor: Colors.Primary,
        backgroundColor: Colors.Surface,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around'
    },
});