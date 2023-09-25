import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as SQLite from 'expo-sqlite';
import { Utils } from '@react-native-firebase/app';
import { CreateDestinations, InsertDestinations } from '../database/Sqlite';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

// import db from '../database/Sqllite';

export default function AddDestination(props) {

    const { setAddModalVisible, addModalVisible } = props
    const [destinationData, setDestinationData] = useState({
        tripName: '',
        destination: '',
        startDate: '',
        endDate: ''
    });

    const updateInputVal = (val, id) => {
        const statex = { ...destinationData };
        statex[id] = val;
        setDestinationData(statex);
    }

    const loggedInUser = useSelector(state => state.some.currentUser)

    const handleCreateTrip = () => {

        console.log("loggedInUser", loggedInUser, destinationData)
        // Inserting destination associated with userId 1234



        console.log("WORKING")
        setAddModalVisible(false)
        CreateDestinations()
        InsertDestinations(destinationData, loggedInUser)

    };

    return (
        <View style={styles.container}>


            <Modal
                animationType="slide"
                transparent={true}
                style={styles.modal}
                visible={addModalVisible}
                onRequestClose={() => {
                    setAddModalVisible(!addModalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <TouchableOpacity onPress={() => setAddModalVisible(false)} style={styles.closeButton}>
                            <FontAwesome name="close" size={18} color="#00c7eb" />
                        </TouchableOpacity>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Trip Name"
                                style={styles.textInput}
                                value={destinationData.tripName}
                                onChangeText={(val) => updateInputVal(val, "tripName")}
                            />

                            <TextInput
                                placeholder="Destination"
                                style={styles.textInput}
                                value={destinationData.destination}
                                onChangeText={(val) => updateInputVal(val, "destination")}
                            />
                            <TextInput
                                placeholder="Start Date (YYYY-MM-DD)"
                                style={styles.textInput}
                                value={destinationData.startDate}
                                onChangeText={(val) => updateInputVal(val, "startDate")}
                            />
                            <TextInput
                                placeholder="End Date (YYYY-MM-DD)"
                                style={styles.textInput}
                                value={destinationData.endDate}
                                onChangeText={(val) => updateInputVal(val, "endDate")}
                            />
                            <TouchableOpacity name="Create Trip" onPress={handleCreateTrip} style={styles.createTrip} ><Text style={styles.createButtontext}  >create</Text></TouchableOpacity>
                        </View>



                    </View>
                </View>
            </Modal>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createTrip: {
        borderRadius: 40,
        backgroundColor: "#00c7eb",
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        color: "white"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        width: 300, // Set width to increase modal size
        height: 300, // Set height to increase modal size
    },

    modalText: {
        marginBottom: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    inputContainer: {
        alignContent: 'center',
        marginTop: 28,
        width: 200,
        height: 200,
        justifyContent: 'space-around'
    },

    textInput: {
        width: 400,
        padding: 10
    },
    closeButton: {
        backgroundColor: 'transparent',
        padding: 10,
        marginTop: 4,
        right: 4,
        position: 'absolute'
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }, 
    createButtontext: {
        color: "#ffff"
    }


});
