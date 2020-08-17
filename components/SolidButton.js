import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Colors from '../utilities/Colors';

export default function SolidButton(props) {
    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            style={[{
                width: '80%',
                backgroundColor: Colors.Primary,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25
            }, props.disabled ? {
                backgroundColor: Colors.Background,
            }: {}, props.style]}
            onPress={() => !props.disabled && props.onPress()}
        >
            <Text style={{
                fontSize: 18,
                fontFamily: "Comfortaa_700Bold",
                color: Colors.PrimaryContrast
            }}>
                {props.text}
            </Text>
            
        </TouchableOpacity>
    )
}
