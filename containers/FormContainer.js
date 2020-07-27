import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Keyboard, Text, View, TextInput, Animated, Button, Dimensions} from 'react-native';
import Colors from '../utilities/Colors';
import * as constants from '../utilities/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

/**
 * This class is a container which will manage forms in the app. An
 * example of this is the Create Account workflow, where we have several
 * forms that we want to get data from. This class manages all those forms.
 */
export default class FormContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            buttonsEnabled: true,
            page: 0,
            pageAnim: new Animated.Value(0),
            width: Dimensions.get('window').width,
            form: {}
        };
    }

    onChange = ({ window, screen }) => {
        this.setState({ width: window.width });
    };

    componentDidMount() {
        Dimensions.addEventListener("change", this.onChange);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.onChange);
    }
    
    goForward() {
        if (this.state.page < this.props.forms.length - 1) {
            if (this.state.buttonsEnabled) {
                this.setState({
                    buttonsEnabled: false,
                });
    
                Animated.timing(this.state.pageAnim, {
                    toValue: this.state.page + 1,
                    duration: constants.PAGE_DURATION,
                    useNativeDriver: false,
                }).start((res) => {
                    this.setState({
                        page: this.state.page + 1,
                        buttonsEnabled: true,
                    });
                });
            }
        } else {
            this.props.onCompleted(this.state.form);
        }
    }

    goBackward() {
        if (this.state.page > 0) {
            if (this.state.buttonsEnabled) {
                this.setState({
                    buttonsEnabled: false,
                });
    
                Animated.timing(this.state.pageAnim, {
                    toValue: this.state.page - 1,
                    duration: constants.PAGE_DURATION,
                    useNativeDriver: false,
                }).start(() => {
                    this.setState({
                        page: this.state.page - 1,
                        buttonsEnabled: true,
                    });
                });
            }
        } else {
            this.props.onCancel();
        }
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <View style={styles.header}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.backButton} onPress={() => this.goBackward()}>
                        <Icon size={30} color='white' name='arrow-left'></Icon>
                    </TouchableOpacity>
                </View>
                <Animated.View style={{width: '100%', position: 'relative', left: Animated.multiply(this.state.pageAnim, -this.state.width), flexDirection: 'row'}}>
                    {this.props.forms.map((Form, index) => 
                        <Form 
                            key={index}
                            onChange={(key, value) => {
                                const state = this.state.form;
                                state[key] = value;
                                this.setState(state);
                            }}
                            onCompleted={(dismissKeyboard=false) => {
                                if (dismissKeyboard)
                                    Keyboard.dismiss();
                                this.goForward();
                            }}
                        />
                    )}
                </Animated.View>
                <View style={styles.progressContainer}>
                    {this.props.forms.map((_ , index) => <View key={index} style={[styles.circle, index > this.state.page ? {backgroundColor: Colors.Grey}: {backgroundColor: Colors.Red}]}/>)}
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
    },
    header : {
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        width: '100%'
    }
});