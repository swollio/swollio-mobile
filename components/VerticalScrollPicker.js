import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Colors from '../utilities/Colors'

export default class ScrollPicker extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.data.findIndex((number) => number == this.props.initialValue) + 1
        }

        console.log(this.state.selected)
        this.viewabilityConfig = {
            itemVisiblePercentThreshold: 50
        };

        this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.state.selected > this.props.data.length) {
            this.setState({
                selected: this.state.selected - 1,
            });
        }
    }
    
    onViewableItemsChanged = ({ viewableItems, changed }) => {
        if (viewableItems[1]) {
            this.setState({
                selected: viewableItems[1].index || 0,
            })
            this.props.onChange(viewableItems[1].item)
        }
    }
    
    render() {
        return <FlatList     
            style={{height: 180, maxHeight: 180, width: this.props.width, overflow: 'hidden'}}
            data={['', ...this.props.data, '']}
            ref={(ref) => { this.flatListRef = ref; }}
            initialScrollIndex={this.state.selected - 1}
            onViewableItemsChanged={this.onViewableItemsChanged}
            showsVerticalScrollIndicator={false}
            viewabilityConfig={this.viewabilityConfig}
            snapToInterval={60}
            decelerationRate="fast"
            bounces={false}
            keyExtractor={(data, index) => index}
            getItemLayout={(data, index) => ({ length: 60, offset: 60 * index, index })}
            renderItem={({ item, index }) => 
            <TouchableOpacity 
                activeOpacity={0.8}
                style={{width: this.props.width, height: 60, alignItems: 'center', justifyContent: 'center'}}
                onPress={() => this.flatListRef.scrollToIndex({index, viewPosition: 0.5})}
            >
                <View style={[
                        styles.item,
                        {width: this.props.width},
                        (item === '' && styles.emptyItem) || {},
                        (index === this.state.selected && styles.selectedItem) || {}]
                    }>
                     <Text style={{fontSize: 20, color: index === this.state.selected ? Colors.PrimaryContrast: Colors.SurfaceContrast2}}>{item}</Text>
                </View>
            </TouchableOpacity>
            }
            />
    }
}

const styles = StyleSheet.create({
    item: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: Colors.Background
    },
    emptyItem: {
        backgroundColor: Colors.Surface
    },
    selectedItem: {
        backgroundColor: Colors.Primary
    }
})