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

    const { setAddModalVisible, addModalVisible } = props
    const [destinationData, setDestinationData] = useState({
        tripName: '',
        destination: '',
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
                            <Text style={styles.textInput}>Start Date</Text>
                            <View style={styles.textInput}>
                                <DatePicker
                                    date={destinationData.startDate}
                                    containerStyle={styles.startdateandtimepicker}
                                    onChange={(val) => updateInputVal(val, "startDate")}
                                />
                            </View>

                            <Text style={styles.textInput}>End Date</Text>
                            <View style={styles.textInput}>
                                <DatePicker
                                    date={destinationData.endDate}
                                    containerStyle={styles.endtdateandtimepicker}
                                    onChange={(val) => updateInputVal(val, "endDate")}
                                />
                            </View>

                            <View style={styles.textInput}>
                                <TouchableOpacity name="Create Trip" onPress={handleCreateTrip} style={styles.createTrip} >
                                    <Text style={styles.createButtontext}>create</Text>
                                </TouchableOpacity>
                            </View>

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
        position: 'absolute',
        color: "white",
        zIndex: 1,
        width: 280,
        marginTop:40,
        marginTop: 20, // Added margin top
        marginBottom: 10, // Added margin bottom



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
        height: 600,
        padding: 20, // Added padding
    },
    startdateandtimepicker: {

        zIndex: 4,
        // bottom: 35,
        position: 'absolute',
        width: 280,
        marginBottom: 10, // Added margin bottom

    },
    endtdateandtimepicker: {
        zIndex: 4,
        position: 'absolute',
        width: 280,
        marginBottom: 10, // Added margin bottom

    },
    modalText: {
        marginBottom: 10,
        fontSize: 16,
        textAlign: 'center',

    },
    inputContainer: {
        alignContent: 'center',
        width: 280,
        height: 600,
        // justifyContent: 'space-around',
        position: 'relative'
    },

    textInput: {
        width: 400,
        padding: 10,
        color: "black",
        zIndex: 1,
        marginTop: 40,
        marginBottom: 10, // Added margin bottom
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
