import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import Colors from '../utilities/Colors';

export default function ScrollWheel(props) {

    // Creating our data list which will be in our FlatView
    let dataVals = ['', '']
    for (let i = props.minVal; i <= props.maxVal; i += props.deltaVal)
        dataVals.push(i)
    dataVals = dataVals.concat(['', '']);

    const [selected, setSelected] = useState(props.minVal + props.initIndex * props.deltaVal);
    
    const onViewRef = useRef(( { viewableItems } ) => {
        setSelected(viewableItems[2].item);
        
        // Passing up inches for form container
        props.onChange(props.field, viewableItems[2].item);
    });

    const viewConfigRef = useRef({
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 95
    });

    function renderItem( { item } ) {
        if (selected === item) {
            return(    
                <View style={styles.selectedScrollView}>
                    <Text style={styles.selectedScrollText}>
                        {item}
                    </Text>
                </View>
            );
        } else if (Math.abs(selected - item) === 1) {
            return(    
                <View style={styles.unselectedScrollView}>
                    <Text style={styles.nextSelectedScrollText}>
                        {item}
                    </Text>
                </View>
            );
        }
        
        return(    
            <View style={styles.unselectedScrollView}>
                <Text style={styles.unselectedScrollText}>
                    {item}
                </Text>
            </View>
        );
    }

    function getItemLayout(data, index) {
        return {
            length: 50,
            offset: 50 * index,
            index
        }
    }

    const flatList = 
        <FlatList
            horizontal={true}
            bounces={false}
            snapToInterval={50}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data = {dataVals}
            initialScrollIndex = {props.initIndex}
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
            getItemLayout={ getItemLayout }
            renderItem = { renderItem }
            keyExtractor={(data, index) => index.toString()}
        />

    return(
        <View style={styles.scrollBackground}>
            {flatList}
        </View>
    ); 
}

const styles = StyleSheet.create({
    scrollBackground: {
        margin: 50, 
        flexDirection: 'row', 
        width: 250, 
        height: 44,
        borderRadius: 22,
        borderWidth: 1, 
        borderColor: Colors.Grey,
        backgroundColor: Colors.Grey,
        justifyContent: 'center', 
        alignItems: 'center',
        alignContent: 'center'
    },
    selectedScrollView: {
        width: 50, 
        height: 44, 
        borderRadius: 22,
        backgroundColor: "#E5E5E5",
        justifyContent: 'center', 
        alignItems: 'center',
        flex:1
    },
    unselectedScrollView: {
        width: 50,
        height: 44, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex:1
    },
    selectedScrollText: {
        textAlign: "center", 
        color: Colors.Black,
        fontSize: 24,
    },
    unselectedScrollText: {
        textAlign: "center", 
        color: "#B5B5B5",
        fontSize: 20
    },
    nextSelectedScrollText: {
        textAlign: "center", 
        color: "#525252",
        fontSize: 22
    }
});