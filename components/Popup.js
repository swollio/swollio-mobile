import React from 'react';
import { StyleSheet, SafeAreaView, View, Modal, TouchableWithoutFeedback } from 'react-native';
import Colors from '../utilities/Colors';

/**
 * This component adds a pop up view that will toggle on and off via the props passed in
 * from the parent
 * @param {Object} props Contains all of the prop data that is passed in from the parent
 * This includes toggle, which is the variable that determines the popup's visibility, and
 * dismissModal, which defines how the popup should act on request to close
 */
export default function Popup(props) {
    return(
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={props.toggle}
            >
            <SafeAreaView style={styles.safeArea} />
            <TouchableWithoutFeedback onPress={props.dismissModal}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={[styles.modalView, props.style]}>
                            {props.children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback> 
        </Modal>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "rgba(0, 0, 0, 0.35)"
    },
    centeredView: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        backgroundColor: "rgba(0,0,0,0.35)"
      },
    modalView: {
        width: "100%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    modalHeader: {
        fontSize: 36,
        textAlign: 'center',
        fontFamily: 'Comfortaa_700Bold',
        color: Colors.Primary,
    },
    modalText: {
        fontFamily: 'Comfortaa_600SemiBold',
        fontSize: 20,
        color: Colors.SurfaceContrast,
        marginVertical: 10,
        textAlign: 'center'
    },
    modalIcon: {
        fontSize: 48,
        marginBottom: 20,
        marginLeft: 10
    }
})