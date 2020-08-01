import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function OptionButton (props) {
    return(
        <TouchableOpacity
            style={props.style}
            onPress={props.onPress}>
            { props.children }
        </TouchableOpacity>
    );
}