import React, { useState } from 'react';
import {TouchableOpacity, Text, View } from 'react-native';
import Colors from '../utilities/Colors';
import Icon from 'react-native-vector-icons/Feather';


export default function MultiSelect(props) {
    
    const initial_state = {};
    props.items.forEach(item => {
        initial_state[item] = false
    });

    const [selected, setSelected] = useState(initial_state);

    return (
        <View style={{width: '100%'}}>
            {props.items.map(x => {
                return (
                    <TouchableOpacity
                        key={x}
                        activeOpacity={0.8} 
                        style={{padding: 16, flexDirection: 'row', alignItems: 'center', width: '90%', borderBottomColor: '#DDD', borderBottomWidth: 1}}
                        onPress={() => {
                            selected[x] = !selected[x]
                            setSelected({...selected})
                        }}
                    >
                        <Icon 
                            name={'check'}
                            size={20}
                            style={{marginRight: 16, color: selected[x] ? Colors.Primary: '#EEE'}}
                            onPress={props.onBack}
                        />
                        <Text>{x}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
}
