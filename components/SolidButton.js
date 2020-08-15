import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Colors from '../utilities/Colors';

export default function SolidButton(props) {
    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            style={[{
                paddingHorizontal: 36,
                width: props.width || 'auto',
                backgroundColor: Colors.Primary,
                height: 50,
                alignItems: 'center',
                margin: 5,
                justifyContent: 'center',
                borderRadius: 25
            }, props.disabled ? {
                backgroundColor: Colors.Background,
            }: {}]}
            onPress={() => !props.disabled && props.onPress()}
        >
            <Text style={{fontSize: 16, color: Colors.PrimaryContrast}}>{props.text}</Text>
        </TouchableOpacity>
    )
}