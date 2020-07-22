import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Button } from 'react-native';
import Colors from './Colors';

export default class FormContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { page: 0 };
    }

    goForward() {
        if (this.state.page < this.props.forms.length - 1) {
            this.setState({page: this.state.page + 1})
        }
    }

    goBackward() {
        if (this.state.page > 0) {
            this.setState({page: this.state.page - 1})
        }
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', width: '100%'}}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.backButton} onPress={() => this.goBackward()}>
                        <Text style={{color: Colors.White}}>Back</Text>
                    </TouchableOpacity>
                </View>
                {this.props.forms[this.state.page]}
                <TouchableOpacity activeOpacity={0.8} style={styles.continueButton} onPress={() => this.goForward()}>
                    <Text style={{color: Colors.White}}>Continue</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        paddingVertical: 48
    },
    backButton: {
        backgroundColor: Colors.Red,
        padding: 10,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        width: 100,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    continueButton: {
        backgroundColor: Colors.Red,
        width: 350,
        maxWidth: '80%',
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 25,
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});