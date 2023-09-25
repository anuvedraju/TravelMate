import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite';
import AddDestination from './addDestination';
import { useSelector } from 'react-redux';
import { CreateTasks, getDestinations } from '../database/Sqlite';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Card from './card';

export default function Home() {


    const [userData, setUserData] = useState([])
    const [myDestinations, setMyDestinations] = useState([])
    const [addModalVisible, setAddModalVisible] = useState(false)

    const loggedInUser = useSelector(state => state.some.currentUser)

    useEffect(() => {

        CreateTasks()
        getDestinations(loggedInUser.email)
            .then(destinations => {
                console.log('Destinationsxxxx:', destinations);
                setMyDestinations(destinations)
                console.log('Destinationsxxxxyyyy:', destinations);
            })
            .catch(error => {
                console.error('Error fetching destinations:', error);
            });


    }, [])

    // const handleAddNewDestination=()=>{
    //     setAddModalVisible(true)
    // }









    return (
        <View style={styles.container}>

            {/* <Text style={styles.logout}>{loggedInUser.displayName}</Text> */}
            {addModalVisible ? <AddDestination setAddModalVisible={setAddModalVisible} addModalVisible={addModalVisible} /> : <View/>}

            {
                myDestinations.length !== 0 ?
                    <ScrollView style={styles.cardcontainer}>
                        {myDestinations?.map((item, index) => (
                            <Card data={item}/>
                        ))}
                    </ScrollView>
                    :
                    <View style={styles.emptylist}>
                        <Text style={styles.emptylist}>
                            Nothing in Your Bucket list!
                        </Text>
                        <FontAwesome name="home" size={200} color="grey" />

                    </View>
            }

            <View style={styles.addNew}>
                <TouchableOpacity onPress={() => setAddModalVisible(true)}>
                <FontAwesome name="plus-circle" size={40} color="#00c7eb" />
                </TouchableOpacity></View>

        </View>
    )





}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdfe4',
        alignItems: 'center',
        // justifyContent: 'center',
       // backgroundColor:"red"
    },
    cardcontainer:{
        width:"95%",
        overflowY:"auto",
        marginTop:4,
        marginBottom:60,
        // backgroundColor:"red"
        

    },
    text: {
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logout: {

        backgroundColor: "#ffff",
        marginTop: 2,
        position: "absolute",
        top: 0,
        right: 4
    },
    emptylist: {
        color: "black",
        fontSize: 28,
        alignContent:"center",
        alignItems:'center'
    },
    addNew: {
        backgroundColor: "#dcdfe4",
        bottom: 0,
        position: "absolute",
        width: "100%",
        alignItems: "center",
        height: 60,

    }
});

