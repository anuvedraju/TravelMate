import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AddTasks from './addTasks';
import { CreateTasks, getTasks } from '../database/Sqlite';
import Task from './tasks';

export default function Activities() {

    const [addTaskModalVisible, setAddTaskModalVisible] = useState(false)
    const currentDestination = useSelector(state => state.some.currentDestination)
    const [myTasks, setMyTasks] = useState([])


    useEffect(() => {

        console.log("currentDestination",currentDestination)


        getTasks(currentDestination.destinationId)
            .then(tasks => {
                console.log('Tasks:', tasks);
                setMyTasks(tasks)
            })
            .catch(error => {
                console.error('Error fetching destinations:', error);
            });


    }, [])









    const handleAddActivity = () => {

        setAddTaskModalVisible(true)
        console.log("currentDestination",currentDestination)

    }
    return (
        <View style={styles.container}>
             {addTaskModalVisible ? <AddTasks setAddTaskModalVisible={setAddTaskModalVisible} addTaskModalVisible={addTaskModalVisible} destinationId={currentDestination.destinationId} /> : <View />}
             
             <Text style={styles.title}>{currentDestination?.name}</Text>
            <View style={styles.detailscontainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Trip Name:</Text>
                    <Text style={styles.text}>{currentDestination?.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Destination:</Text>
                    <Text style={styles.text}>{currentDestination?.destinationName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Start Date:</Text>
                    <Text style={styles.text}>{currentDestination?.startDate}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>End Date:</Text>
                    <Text style={styles.text}>{currentDestination?.endDate}</Text>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddActivity()}>
                        <Text style={styles.buttonText}>Add Activity</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.subtitle}>Tasks</Text>
            <View style={styles.detailscontainer}>
            {
                myTasks?.length !== 0 ?
                    <ScrollView style={styles.taskContainer}>
                        {myTasks?.map((item, index) => (
                            <Task data={item}/>
                        ))}
                    </ScrollView>
                    :<View/>
            }
                </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   justifyContent: 'center',
        marginTop: 10,
        alignItems: 'center',
    },
    detailscontainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        width: 300, // Adjust width as needed
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    text: {
        flexShrink: 1,
        marginLeft: 10,
    },
    addButton: {
        marginTop: 2,
        padding: 2,
        borderRadius: 8,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#00c7eb',
        borderRadius: 8,
    },
    buttonText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
        padding:4
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        padding:10
    },
    subtitle:{
        fontSize:14,
        fontWeight:"bold",
        padding:10
    }
});




