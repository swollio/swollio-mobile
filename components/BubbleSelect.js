import React, { useState } from 'react';
import {TouchableOpacity, Text, View } from 'react-native';
import Colors from '../utilities/Colors';
import Icon from 'react-native-vector-icons/Feather';


export default function MultiSelect(props) {
    
    const initial_state = {};
    props.items.map(props.id).forEach(item => {
        initial_state[item] = false
    });

    const [selected, setSelected] = useState(initial_state);

    return (
        <View style={{width: '100%', paddingVertical: 36, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
            {props.items.map(x => {
                const id = props.id(x);
                return (
                    <TouchableOpacity
                        key={id}
                        activeOpacity={0.8} 
                        style={[{height: 50, paddingHorizontal: 24, margin: 8, flexDirection: 'row', alignItems: 'center', borderRadius: 25, borderColor: Colors.Primary, borderWidth: 1},
                        selected[id] ? {backgroundColor: Colors.Primary}: {}]}
                        onPress={() => {
                            selected[id] = !selected[id]
                            setSelected({...selected})
                            const result = props.items.filter(x => selected[x.id])
                            props.onChange(result)
                        }}
                    >
                        <Text style={{color: selected[id] ? Colors.PrimaryContrast: Colors.Primary}}>{props.text(x)}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
}
