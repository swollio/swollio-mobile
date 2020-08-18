import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../utilities/Colors';
import { Tag, OptionButton, Popup } from "../../components/Components";
import { getTagsForTeam, postAthleteTeamTag, getAthleteTags, postTeamTag } from "../../utilities/api";

export default function AthleteSettings(props) {


    const [tagInputState, setTagInputState] = useState(0);
    const [teamTags, setTeamTags] = useState(null);
    const [athleteTags, setAthleteTags] = useState(null);
    const [createTag, setCreateTag] = useState(false);

    useEffect(() => {
        if (!teamTags)
            getTagsForTeam(props.teamId).then(res => setTeamTags(res))
        
        // Meaning tagInputState has just changed (indicating a change in tags)
        // or was just intialized
        if (!tagInputState)
            getAthleteTags(props.athlete.id, props.teamId).then(res => setAthleteTags(res))
    }, [tagInputState])

    const tags = (athleteTags || []).map(tag => <Tag key={tag.id} tagStyle={{marginVertical: 5}} tag={tag.tag} />);

    let tagButtons = (teamTags || []).map(team_tag => 
            <TouchableOpacity key={team_tag.id} activeOpacity={0.2} onPress={() =>
                postAthleteTeamTag(props.athlete.id, team_tag.id).then(() => setTagInputState(false))
            }>
                <Text style={styles.athleteText}>{team_tag.tag}</Text>
            </TouchableOpacity>
        )
    
    function submitVals() {
        postTeamTag(props.teamId, createTag)
        setCreateTag(null)
    }

    function TagChooseView () {
        if (createTag)
            return (
                <TextInput
                    enablesReturnKeyAutomatically={true}
                    style={styles.textInput}
                    onChangeText={(text) => setCreateTag(text)}
                    onSubmitEditing={submitVals}
                />
            );

        return (
            <Popup
                toggle={tagInputState}
                onDismiss={() => setTagInputState(false)}
            >
                { !createTag ?
                        <>
                            <ScrollView 
                                showsVerticalScrollIndicator={false}
                                style={styles.scrollStyle}
                            >
                                {tagButtons}
                            </ScrollView>
                            <OptionButton style={{width: 200}} onPress={() => setCreateTag(true)}>
                                <Text style={{
                                    fontSize: 24,
                                    fontFamily: "Comfortaa_600SemiBold"}}>
                                        + Add New Tag
                                    </Text>
                            </OptionButton>
                            <OptionButton style={{width: 200}} onPress={() => setTagInputState(false)}>
                                <Text style={{
                                    fontSize: 24,
                                    fontFamily: "Comfortaa_600SemiBold"}}>
                                        Cancel
                                    </Text>
                            </OptionButton>
                        </>
                    :
                    <TextInput 
                        style={styles.textInput} 
                        onSubmitEditing={(event) => {
                            console.log(event.nativeEvent.text)
                            setCreateTag(false)
                            setTagInputState(false)
                        }}
                    />
                }
            </Popup>
        );
    }   

    return (
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
                { tagInputState ? <TagChooseView /> : <></> }
                <ScrollView style={{ height: "100%", padding: 20, marginVertical: 10}}>
                    <>
                        <Text style={[styles.question, { marginBottom: 10}]}>Tags:</Text>
                        <View style={{flex: 1, flexDirection: 'row', flexWrap:'wrap'}}>
                            {tags}
                            <TouchableOpacity onPress={() => setTagInputState(true)}>
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
        marginLeft: 5,
        alignSelf: 'center'
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
        height:150,
        width:200,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 10,
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
    textInput: {
        width: "55%",
        backgroundColor: Colors.Background,
        paddingHorizontal: 24,
        fontSize: 16,
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 10,
        maxWidth: '80%',
        textAlign: 'center'
    },
    scrollStyle: {
        height: "25%",
        width: "100%",
        borderWidth: 1,
        borderColor: Colors.Primary,
        borderRadius: 8,
        padding: 8
    }
})