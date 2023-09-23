// App.js
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import Signup from './signUp';
import Login from './login';
import Home from './home';
const Stack = createStackNavigator();
function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName="Signup"
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>

            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ title: 'Signup' }}
            />
            <Stack.Screen
                name="Login"
                component={Login} />


            <Stack.Screen
                name="Home"
                component={Home}

            />

        </Stack.Navigator>
    );
}
export default MyStack
