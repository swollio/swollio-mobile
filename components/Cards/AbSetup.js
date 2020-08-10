import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../utilities/Colors';
import Card from './Card';
import ButtonRow from "../ButtonRow";
import ScrollPicker from "../ScrollPicker";
import OptionButton from '../OptionButton';

/**
 * This component is a way to setup the details for your ab exercise
 * @param {Object} props Contains the props needed for this card
 */
export default function AbSetup(props) {
    
    return(
        <Card>
            <Text style={styles.title}>Setup your ab exercise:</Text>
            <Text style={styles.body}>
                Set your rep time:
            </Text>
            <View style={{alignItems: 'center'}}>
                <ButtonRow 
                    style={styles.toggleButton} 
                    buttons={[15, 30, 45, 60]}
                    onChange={(button) => props.onPress(button)}
                />
            </View>
            <Text style={styles.body}>
                Set number of exercises:
                </Text>
            <View style={{alignItems: 'center'}}>
                <ScrollPicker
                    selectColor={Colors.Primary}
                    data={[...Array(18).keys()].map(x => x + 1)}
                    initialValue={12}
                    onChange={(i) => props.onChange(i) }
                />
            </View>
            <Text style={[styles.body, { marginTop: 20, fontSize: 22 }]}>
                This will take {props.totalTime} minutes
            </Text>
            <View style={{ alignItems: 'center' }}>
                <OptionButton onPress={props.onFinish} >
                    <Text style={{color: Colors.Primary, fontSize: 26 }}>
                    Bring it on!
                    </Text>
                </OptionButton>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'left',
    },
    body: {
        fontSize: 18,
        fontFamily: 'Comfortaa_400Regular',
        marginVertical: 16,
    },
    toggleButton: {
        padding: 10,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
    }
});