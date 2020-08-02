import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../utilities/Colors';
import LogoOutline from '../LoadingPage'
import LoadingPage from '../LoadingPage';

export default function UserTab(props) {

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.title}>Hello, {props.user.first_name}!</Text>
            </View>
            <View style={{margin: 10, flex: 1}}>
                <LoadingPage></LoadingPage>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 15,
        paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: {
        fontSize: 32,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
})