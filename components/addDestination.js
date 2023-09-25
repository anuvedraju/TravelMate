import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as SQLite from 'expo-sqlite';
import { Utils } from '@react-native-firebase/app';
import { CreateDestinations, InsertDestinations } from '../database/Sqlite';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import DatePicker from "expo-datepicker";

// import db from '../database/Sqllite';

export default function AddDestination(props) {

    const { setAddModalVisible, addModalVisible,setMyDestinations,myDestinations } = props
    const [destinationData, setDestinationData] = useState({
        name: '',
        destinationName: '',
        startDate: '',
        endDate: ''
    });
    const [date, setDate] = useState(new Date().toString());
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

        const statex = [...myDestinations]
        statex.push(destinationData)
        console.log("statex",statex)
        setMyDestinations(statex)


    };

    return (
        <View style={styles.container}>



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
                                        onChangeText={(val) => updateInputVal(val, "name")}
                                    />
                                    <TextInput
                                        placeholder="Destination"
                                        style={styles.textInput}
                                        value={destinationData.destination}
                                        onChangeText={(val) => updateInputVal(val, "destinationName")}
                                    />

                                    <Text style={styles.label}>Start Date</Text>
                                    <View style={styles.datePicker}>
                                        <DatePicker
                                            date={destinationData.startDate}
                                            containerStyle={styles.startdateandtimepicker}
                                            onChange={(val) => updateInputVal(val, "startDate")}
                                        />
                                    </View>

                                    <Text style={styles.label}>End Date</Text>
                                    <View style={styles.datePicker}>
                                        <DatePicker
                                            date={destinationData.endDate}
                                            containerStyle={styles.endtdateandtimepicker}
                                            onChange={(val) => updateInputVal(val, "endDate")}
                                        />
                                    </View>

                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity name="Create Trip" onPress={handleCreateTrip} style={styles.createTrip}>
                                            <Text style={styles.createButtontext}>Create</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',



    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    createTrip: {
        borderRadius: 40,
        backgroundColor: "#00c7eb",
        alignItems: 'center',
        padding: 10,
        color: "white",
        width: 280,
        marginTop: 20,
        zIndex: 1



    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        width: 300,
        height: 450,

    },
    datePicker: {
        marginBottom: 20,
        padding: 28,

        position: 'relative'
    },
    startdateandtimepicker: {

        width: 280,
        position: 'absolute',
        zIndex: 4,



    },
    endtdateandtimepicker: {
        width: 280,
        position: 'absolute',
        zIndex: 2,



    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',

    },
    inputContainer: {
        alignContent: 'center',
        width: 280,
        height: 600,
        marginTop: 50
    },

    textInput: {
        width: 400,
        height: 40
    },
    closeButton: {
        backgroundColor: 'transparent',
        padding: 10,
        marginTop: 4,
        right: 4,
        position: 'absolute',
        zIndex: 4
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
