import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Animated, Button, Dimensions} from 'react-native';
import Colors from './Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class FormContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            buttonsEnabled: true,
            page: 0,
            pageAnim: new Animated.Value(0)
        };
    }

    goForward() {
        if (this.state.page < this.props.forms.length - 1 &&  this.state.buttonsEnabled) {

            this.setState({
                buttonsEnabled: false,
            });

            Animated.timing(this.state.pageAnim, {
                toValue: this.state.page + 1,
                duration: 500,
                useNativeDriver: false,
            }).start((res) => {
                this.setState({
                    page: this.state.page + 1,
                    buttonsEnabled: true,
                });
            });
        }
    }

    goBackward() {
        if (this.state.page > 0 && this.state.buttonsEnabled) {

            this.setState({
                buttonsEnabled: false,
            });

            Animated.timing(this.state.pageAnim, {
                toValue: this.state.page - 1,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                this.setState({
                    page: this.state.page - 1,
                    buttonsEnabled: true,
                });
            });
        }
    }

    render() {
        const width = Dimensions.get('window').width;
        return (
            <View style={styles.formContainer}>
                <View style={[{flexDirection: 'row', justifyContent: 'flex-start', width: '100%'}, this.state.page == 0? {opacity: 0}: {}]}>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        style={styles.backButton}
                        onPress={() => this.goBackward()}>
                        <Icon size={30} color='white' name='arrow-left'></Icon>
                    </TouchableOpacity>
                </View>
                <Animated.View style={{width: '100%', position: 'relative', left: Animated.multiply(this.state.pageAnim, -width), flexDirection: 'row'}}>
                    {this.props.forms.map((Form, index) => <Form key={index} onCompleted={() => this.goForward()}></Form>)}
                </Animated.View>
                <View style={styles.progressContainer}>
                    {this.props.forms.map((_, index) => <View key={index} style={[styles.circle, index > this.state.page ? {backgroundColor: Colors.Grey}: {backgroundColor: Colors.Red}]}/>)}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        paddingVertical: 48,
        width: '100%',
        overflow: 'hidden',
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 5,
    },
    backButton: {
        backgroundColor: Colors.Red,
        padding: 10,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
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
        alignItems: 'center',
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