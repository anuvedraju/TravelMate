// components/login.js
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import { useNavigation } from '@react-navigation/native';

export default function Login() {

    const [state, setState] = useState({
        email: '',
        password: '',
        isLoading: false
    });
    const navigation = useNavigation();

    updateInputVal = (val, id) => {
        const statex = { ...state };
        statex[id] = val;
        setState(statex);
    }
    const userLogin = () => {
        if (state.email === '' && state.password === '') {
            Alert.alert('Enter details to signin!')
        } else {
            setState({
                isLoading: true,
            })

            firebase.auth()
                .signInWithEmailAndPassword(state.email, state.password)
                .then((res) => {
                    console.log(res)
                    console.log('User logged-in successfully!')
                    setState({
                        isLoading: false,
                        email: '',
                        password: ''
                    })
                    navigation.navigate('Home')
                })
                .catch(error => setState({ errorMessage: error.message }))
        }
    }
    return (

        <View style={styles.container}>
            <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                value={state.email}
                onChangeText={(val) => updateInputVal(val, 'email')}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                value={state.password}
                onChangeText={(val) => updateInputVal(val, 'password')}
                maxLength={15}
                secureTextEntry={true}
            />
            <Button
                color="#3740FE"
                title="Signin"
                onPress={() => userLogin()}
            />
            <Text
                style={styles.loginText}
                onPress={() => navigation.navigate('Signup')}>
                Don't have account? Click here to signup
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
        color: '#3740FE',
        marginTop: 25,
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