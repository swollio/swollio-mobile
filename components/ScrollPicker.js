import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Colors from '../utilities/Colors'

export default class ScrollPicker extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selected: 5
        }
        this.viewabilityConfig = {
            itemVisiblePercentThreshold: 50
        };
    }

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        this.setState({
            selected: viewableItems[2].index,
        })
    }
    
    render() {
        return <FlatList             
            style={{width: 250, height: 50, overflow: 'hidden'}}
            data={['', '', ...this.props.data, '', '']}
            ref={(ref) => { this.flatListRef = ref; }}
            initialScrollIndex={5}
            onViewableItemsChanged={this.onViewableItemsChanged}
            renderItem={({ item, index }) => 
            <TouchableOpacity 
                activeOpacity={0.8}
                style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}
                onPress={() => this.flatListRef.scrollToIndex({index, viewPosition: 0.5})}
            >
                <View style={[
                        styles.item,
                        (item === '' && styles.emptyItem) || {},
                        (index === this.state.selected && styles.selectedItem) || {}]
                    }>
                     <Text style={{color: Colors.PrimaryContrast}}>{item}</Text>
                </View>
            </TouchableOpacity>
            }
            showsHorizontalScrollIndicator={false}
            viewabilityConfig={this.viewabilityConfig}
            pagingEnabled={true}
            horizontal={true}
            getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
            />
    }
}

const styles = StyleSheet.create({
    item: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: Colors.Background
    },
    emptyItem: {
        backgroundColor: Colors.Surface
    },
    selectedItem: {
        backgroundColor: Colors.Primary
    }
})