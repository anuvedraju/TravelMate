// components/signup.js
import React, { Component, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import * as SQLite from 'expo-sqlite';
import 'firebase/firestore';
import { useDispatch } from 'react-redux';
import * as Actions from "../database/store/actions"
import { InsertUser, createUsers, dropTables } from '../database/Sqlite';

export default function Signup() {

    const navigation = useNavigation();
    
    // navigation.navigate('Home')
    const [state, setState] = useState({
        displayName: '',
        email: '',
        password: '',
        isLoading: false
    });



    const updateInputVal = (val, id) => {

        const statex = { ...state };
        statex[id] = val;
        setState(statex);
    }


    

        const handleCreateUser = (user) => {


          createUsers()
          InsertUser(user)
          

          


            }
          
          


    
    //   const userRef = firebase.firestore().collection('users');
    //   userRef.add({
    //     uid,
    //     displayName,
    //     email
    //   })
    //   .then((docRef) => {
    //     console.log('User added to Firestore with ID: ', docRef.id);
    //   })
    //   .catch((error) => {
    //     console.error('Error adding trip to Firestore: ', error);
    //   });

    













    const registerUser = () => {
        if (state.email === '' && state.password === '') {
            Alert.alert('Enter details to signup!')
        } else {
            setState({
                isLoading: true,
            })
            firebase.auth()
                .createUserWithEmailAndPassword(state.email, state.password)
                .then((res) => {
                    console.log(res, "response")
                    res?.user.updateProfile({
                        displayName: state.displayName
                    })
                    console.log('User registered successfullyx!',res)
                    

                    handleCreateUser(res.user)

                    // syncData(res)
                    setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: ''
                    })
                    navigation.navigate('Login')
                })
                .catch(error => setState({ errorMessage: error.message }))
        }
    }
    return (

        <View style={styles.container}>
            <TextInput
                style={styles.inputStyle}
                placeholder="Name"
                value={state.displayName}
                onChangeText={(val) => updateInputVal(val, 'displayName')}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                value={state.email}
                onChangeText={(val) => updateInputVal(val, 'email')}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                value={state?.password}
                onChangeText={(val) => updateInputVal(val, 'password')}
                maxLength={15}
                secureTextEntry={true}
            />
            <Button
                color="#00c7eb"
                title="Signup"
                onPress={() => registerUser()}
            />

            <Text
                style={styles.loginText}
                onPress={() => navigation.navigate('Login')}>
                Already Registered ?<Text style={{fontWeight:'bold'}}> Click here to login</Text>
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    loginText: {
        color: 'grey',
        marginTop: 50,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});
