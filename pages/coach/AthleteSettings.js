import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../utilities/Colors';
import { Tag, OptionButton } from "../../components/Components";
import { getTagsForTeam, postAthleteTeamTag, getAthleteTags } from "../../utilities/api";

export default function AthleteSettings(props) {
    const [tagInput, setTagInput] = useState(false);
    const [teamTags, setTeamTags] = useState(null);
    const [athleteTags, setAthleteTags] = useState(null);
    
    useEffect(() => {
        if (!teamTags)
            getTagsForTeam(props.teamId).then(res => setTeamTags(res))
        
        // Meaning tagInput has just changed (indicating a change in tags)
        // or was just intialized
        if (!tagInput)
            getAthleteTags(props.athlete.id, props.teamId).then(res => setAthleteTags(res))
    }, [tagInput])

    tags = (athleteTags || []).map(tag => <Tag key={tag.id} tagStyle={{marginVertical: 5}} tag={tag.tag} />);

    let tagButtons = (teamTags || []).map(tag => 
        <TouchableOpacity key={tag.id} activeOpacity={0.2} onPress={() => {
            postAthleteTeamTag(props.teamId, props.athlete.id, tag.id)
            setTagInput(false);
        }}>
            <Text style={styles.athleteText}>{tag.tag}</Text>
        </TouchableOpacity>
        )

    function TagChooseView () {
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={tagInput}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ScrollView 
                            showsVerticalScrollIndicator={false}
                            style={{height:"50%"}}
                            >
                            {tagButtons}
                        </ScrollView>
                    </View>
                    <OptionButton style={{width: 200}} onPress={() => setTagInput(false)}>
                        <Text style={{
                            fontSize: 24,
                            fontFamily: "Comfortaa_600SemiBold"}}>
                                Cancel
                            </Text>
                    </OptionButton>
                </View>
                
            </Modal>
        );
    }   

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={{
                backgroundColor: Colors.Surface,
                height: "100%"
            }}>
                <View style={styles.header}>
                    <Icon
                        name={'arrow-left'}
                        style={styles.headerIcon}
                        onPress={props.pop}
                    />
                    <Text style={styles.title}>
                        {`${props.athlete.first_name}'s Settings`}
                    </Text>
                    <Icon
                        name={'arrow-left'}
                        style={{ fontSize: 30, color: Colors.Primary }}
                    />
                </View>
                { tagInput ? <TagChooseView /> : <></> }
                <ScrollView style={{ height: "100%", padding: 20}}>
                    <>
                        <Text style={[styles.question, { marginBottom: 10}]}>Tags:</Text>
                        <View style={{flex: 1, flexDirection: 'row', flexWrap:'wrap'}}>
                            {tags}
                            <TouchableOpacity onPress={() => setTagInput(true)}>
                                <Tag tagStyle={{marginVertical: 5}} tag={"+ add tag"}/>
                            </TouchableOpacity>
                        </View>
                    </>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 0,
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    header: {
        width: '100%',
        padding: 16,
        borderBottomColor: Colors.BackgroundContrast,
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: "row"
    },
    title: {
        fontSize: 32,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'center',
        marginLeft: 10,
        flex: 1
    },
    subtitle: {
        fontSize: 24,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    },
    athleteText: {
        fontSize: 24,
        fontFamily: "Comfortaa_600SemiBold",
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 5
    },
    headerIcon: {
        fontSize: 30,
        color: Colors.PrimaryContrast,
    },
    question: {
        fontSize: 28,
        fontFamily: "Comfortaa_600SemiBold",
        textAlign: 'left',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        height:200,
        width:200,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
})