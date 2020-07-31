import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Colors from '../utilities/Colors'

export default class ScrollPicker extends Component {
    
    constructor(props) {
        super(props);

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();

        console.log({month, day})
        this.state = {
            monthSelected: month,
            daySelected: day
        }
        this.viewabilityConfig = {
            itemVisiblePercentThreshold: 50
        };
    }

    onViewableItemsChangedMonth = ({ viewableItems, changed }) => {
        this.setState({
            monthSelected: viewableItems[1].index,
        })
        this.props.onChange(this.state.monthSelected + '/' + this.state.daySelected)
    }

    onViewableItemsChangedDay = ({ viewableItems, changed }) => {
        this.setState({
            daySelected: viewableItems[2].index,
        })
        this.props.onChange(this.state.monthSelected + '/' + this.state.daySelected)

    }
    
    render() {
        return <View style={{alignItems: 'center', marginVertical: 16, height: 150}}>
            <FlatList 
                style={{width: 300, marginVertical: 8, overflow: 'hidden'}}
                horizontal={true}
                data={['', 'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December', '']}
                ref={(ref) => { this.monthFlatListRef = ref; }}
                initialScrollIndex={this.state.monthSelected - 1}
                onViewableItemsChanged={this.onViewableItemsChangedMonth}
                renderItem={({ item, index }) => 
                <TouchableOpacity 
                    activeOpacity={0.8}
                    style={{width: 100, alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.monthFlatListRef.scrollToIndex({index, viewPosition: 0.5})}
                >
                    <View style={[
                            styles.item,
                            {width: 90},
                            (item === '' && styles.emptyItem) || {},
                            (index === this.state.monthSelected && styles.selectedItem) || {}]
                        }>
                        <Text style={{color: Colors.PrimaryContrast}}>{item}</Text>
                    </View>
                </TouchableOpacity>
                }
                viewabilityConfig={this.viewabilityConfig}
                pagingEnabled={true}
                getItemLayout={(data, index) => ({ length: 100, offset: 100 * index, index })}
            />
                        <FlatList 
                style={{width: 300, marginVertical: 8, overflow: 'hidden'}}
                data={['', '', ...[...Array(31).keys()].map(x => x + 1), '', '']}
                ref={(ref) => { this.dayFlatListRef = ref; }}
                initialScrollIndex={this.state.daySelected - 1}
                horizontal={true}
                onViewableItemsChanged={this.onViewableItemsChangedDay}
                renderItem={({ item, index }) => 
                <TouchableOpacity 
                    activeOpacity={0.8}
                    style={{width: 60, alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.dayFlatListRef.scrollToIndex({index, viewPosition: 0.5})}
                >
                    <View style={[
                            styles.item,
                            {width: 50},
                            (item === '' && styles.emptyItem) || {},
                            (index === (this.state.daySelected) && styles.selectedItem) || {}]
                        }>
                        <Text style={{color: Colors.PrimaryContrast}}>{item}</Text>
                    </View>
                </TouchableOpacity>
                }
                viewabilityConfig={this.viewabilityConfig}
                pagingEnabled={true}
                getItemLayout={(data, index) => ({ length: 60, offset: 60 * index, index })}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    item: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: Colors.Background
    },
    emptyItem: {
        backgroundColor: Colors.Surface,
    },
    selectedItem: {
        backgroundColor: Colors.Primary
    }
})