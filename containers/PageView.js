import React, { Component } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, Text, View, TextInput, Animated, Button, Dimensions, ColorPropType} from 'react-native';
import Colors from '../utilities/Colors';
import { Card, ScrollWheel } from '../components/Components';
import Icon from 'react-native-vector-icons/Feather';

export default class PageView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        };
    }

    switchPage(index) {
        if (index >= 0 && index < this.props.pages.length) {
            this.setState({
                page: index
            });
        }
    }

    render() {
        const currentPage = this.props.pages[this.state.page]
        const Content = currentPage.content;
        const color = currentPage.color;

        return (
            <>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.Red }} />
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <View style={styles.container}>
                    <Content></Content>
                    <View style={{flex: 1}}>
                        { this.props.children }
                    </View>
                    <View style={[styles.navigation, { borderColor: color }]}>
                        {this.props.pages.map((page, index) => {
                            if (this.state.page == index) {
                                return <Icon key={index} size={40} onPress={() => this.switchPage(index)} color={Colors.Black} name={page.icon}/>
                            } else {
                                return <Icon key={index} size={40} onPress={() => this.switchPage(index)} color={Colors.Grey} name={page.icon}/>
                            }
                        })}
                    </View>
                </View>
            </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.LightGrey,
    },  
    navigation: {
        borderTopWidth: 2,
        backgroundColor: Colors.White,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around'
    },
});