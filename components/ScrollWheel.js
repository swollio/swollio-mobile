import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import Colors from '../utilities/Colors';

/**
 * This function returns a stateful component that contains a scroll
 * wheel. This scroll wheel has the following properties (handed down via props):
 * 
 * [minVal, maxVal, deltaVal, initIndex], onChange. All should be pretty self
 * explanatory, except initIndex (which defines what item we start on by index)
 * 
 * @param {Object} props Contains all the props handed down from the JSX tags
 */
export default function ScrollWheel(props) {

    // Creating our data list which will be in our FlatView
    let dataVals = ['', '']
    for (let i = props.vals[0]; i <= props.vals[1]; i += props.vals[2])
        dataVals.push(i)
    dataVals = dataVals.concat(['', '']);

    const [selected, setSelected] = useState(props.vals[0] + props.vals[3] * props.vals[2]);
    
    const onViewRef = useRef(( { viewableItems } ) => {
        setSelected(viewableItems[2].item);
        
        // Passing up inches for form container
        if (props.onChange)
            props.onChange(viewableItems[2].item);
    });

    const viewConfigRef = useRef({
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 95
    });

    function renderItem( { item } ) {
        if (selected === item) {
            return(    
                <View style={[styles.selectedScrollView, {backgroundColor: props.selectColor}]}>
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
            initialScrollIndex = {props.vals[3]}
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
        flexDirection: 'row', 
        width: 250, 
        height: 46,
        borderRadius: 23,
        borderWidth: 1, 
        borderColor: Colors.Primary,
        justifyContent: 'center', 
        alignItems: 'center',
        alignContent: 'center'
    },
    selectedScrollView: {
        width: 44, 
        height: 44, 
        borderRadius: 22,
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
        color: Colors.PrimaryContrast,
        fontSize: 24,
    },
    unselectedScrollText: {
        textAlign: "center", 
        color: Colors.SurfaceContrast,
        fontSize: 20
    },
    nextSelectedScrollText: {
        textAlign: "center", 
        color: Colors.SurfaceContrast2,
        fontSize: 22
    },
    flatListStyle: {
        overflow: 'visible'
    }
});