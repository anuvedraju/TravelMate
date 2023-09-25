import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite';
import AddDestination from './destinations/addDestination';
import { useSelector } from 'react-redux';
import { CreateTasks, getDestinations } from '../database/Sqlite';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Card from './destinations/card';

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

    return (
        <View style={styles.container}>
            {addModalVisible ? <AddDestination setAddModalVisible={setAddModalVisible} addModalVisible={addModalVisible} myDestinations={myDestinations} setMyDestinations={setMyDestinations} /> : <View />}

            {
                myDestinations.length !== 0 ?
                    <ScrollView style={styles.cardcontainer}>
                        {myDestinations?.map((item, index) => (
                            <Card data={item} key={index} />
                        ))}
                    </ScrollView>
                    :
                    <View style={styles.emptylist}>

                        <FontAwesome name="home" size={200} color="grey" />
                        <Text style={styles.emptylist}>
                            Nothing in Your Bucket list!
                        </Text>

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
        backgroundColor: '#ffff',
        alignItems: 'center',
    },
    cardcontainer: {
        width: "95%",
        overflowY: "auto",
        marginTop: 4,
        marginBottom: 60,

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
        color: "#dcdfe4",
        fontSize: 28,
        alignContent: "center",
        alignItems: 'center'
    },
    addNew: {
        backgroundColor: "#ffff",
        bottom: 0,
        position: "absolute",
        width: "100%",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#dcdfe4",
        height: 60,

    }
});

