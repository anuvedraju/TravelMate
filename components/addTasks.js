import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as SQLite from 'expo-sqlite';
import { Utils } from '@react-native-firebase/app';
import { CreateTasks, InsertTasks } from '../database/Sqlite';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

// import db from '../database/Sqllite';

export default function AddTasks(props) {

    const { setAddTaskModalVisible, addTaskModalVisible,destinationId,myTasks, setMyTasks } = props

    const [taskData, setTaskData] = useState({
        taskName: '',
        date: '',
        time: '',
        isCompleted:0,
        description:''
    
    });

    const updateInputVal = (val, id) => {
        const statex = { ...taskData };
        statex[id] = val;
        setTaskData(statex);
    }

    const loggedInUser = useSelector(state => state.some.currentUser)

    const handleCreateTask = () => {

        console.log("loggedInUser", loggedInUser, taskData)
        // Inserting task associated with userId 1234



        console.log("WORKINGx",destinationId)
        setAddTaskModalVisible(false)
        CreateTasks()
        InsertTasks(taskData, destinationId)

        const statex = [...myTasks]
        statex.push(taskData)
        console.log("statex",statex)
        setMyTasks(statex)

    };

    return (
        <View style={styles.container}>


            <Modal
                animationType="slide"
                transparent={true}
                style={styles.modal}
                visible={addTaskModalVisible}
                onRequestClose={() => {
                    setAddTaskModalVisible(!addTaskModalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <TouchableOpacity onPress={() => setAddTaskModalVisible(false)} style={styles.closeButton}>
                            <FontAwesome name="close" size={18} color="#00c7eb" />
                        </TouchableOpacity>
                        <View style={styles.inputContainer}>


                            <TextInput
                                placeholder="Task"
                                style={styles.textInput}
                                value={taskData.task}
                                onChangeText={(val) => updateInputVal(val, "taskName")}
                            />
                            <TextInput
                                placeholder="Date"
                                style={styles.textInput}
                                value={taskData.date}
                                onChangeText={(val) => updateInputVal(val, "date")}
                            />
                            <TextInput
                                placeholder="Time"
                                style={styles.textInput}
                                value={taskData.time}
                                onChangeText={(val) => updateInputVal(val, "time")}
                            />
                                <TextInput
                                placeholder="Description"
                                style={styles.textInput}
                                value={taskData.description}
                                onChangeText={(val) => updateInputVal(val, "description")}
                            />
                            <TouchableOpacity name="Create Task" onPress={handleCreateTask} style={styles.createTask} ><Text style={styles.createButtontext}  >create</Text></TouchableOpacity>
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
    createTask: {
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
