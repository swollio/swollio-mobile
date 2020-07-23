import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Animated, Button, Dimensions} from 'react-native';
import Colors from './forms/Colors';
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
        const Header = this.props.pages[this.state.page].header;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header />
                </View>
                <View style={{flex: 1}}>
                    <Text>Content</Text>  
                </View>
                <View style={styles.navigation}>
                    {this.props.pages.map((page, index) => {
                        if (this.state.page == index) {
                            return <Icon size={30} onPress={() => this.switchPage(index)} color={Colors.Black} name={page.icon}/>
                        } else {
                            return <Icon size={30} onPress={() => this.switchPage(index)} color={Colors.Grey} name={page.icon}/>
                        }
                    })}
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.LightGrey,
    },  
    header: {
        width: '100%',
        padding: 20,
        backgroundColor: Colors.Red,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        color: Colors.White,
        fontSize: 24,
    },
    navigation: {
        borderColor: Colors.Red,
        borderTopWidth: 2,
        height: 60,
        backgroundColor: Colors.White,
        flexDirection: 'row',
        paddingBottom: 20,
        paddingTop: 10,
        justifyContent: 'space-evenly'
    },
});