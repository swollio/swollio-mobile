import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Colors from '../utilities/Colors';

/**
 * The ErrorMessage component displays an error message indicating that some
 * process has failed. It takes two arguments: title and message. If either 
 * argument is falsy, the component returns an empty react fragment.
 * 
 * @param title - a general label for the error
 * @param message - a specific message indicating what went wrong
 */
export default function ErrorMessage(props) {

    if (!props.title || !props.message) return <></>

    return (
        <View style={{
            width: '100%',
            borderColor: Colors.Error, 
            borderWidth: 1,
            borderRadius: 12,
            marginVertical: 8,
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <Icon
                name={'alert-triangle'}
                size={30}
                style={{
                    padding: 12,
                    color: Colors.Error
                }}
            />
            <View>
                <Text style={{
                    color: Colors.Error,
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Comfortaa_700Bold',
                    marginBottom: 2,
                }}>{props.title}</Text>
                <Text style={{
                    color: Colors.Error,
                    fontSize: 12,
                    fontFamily: 'Comfortaa_300Light',
                }}>{props.message}</Text>      
            </View>
        </View>
    );
}
