// App.js
import * as React from "react";
import { useNavigation } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import Signup from "./users/signUp";
import Login from "./users/login";
import Home from "./home";
import Activities from "./tasks/activities";
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#00c7eb",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup" }}
      />
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Activities" component={Activities} />
    </Stack.Navigator>
  );
}
export default MyStack;
