import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyStack from './components/main';
import { Provider } from 'react-redux';
import store from './database/store/store';
import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import 'firebase/firestore';
import { getSQLiteData, syncDataToFirestore } from './database/sync';


export default function App() {



  useEffect(() => {
    // AppState.addEventListener('change', handleAppStateChange);

    // return () => {
    //   AppState?.removeEventListener('change', handleAppStateChange);
    // };

    const subscription = AppState.addEventListener('change', (appState) => {
      if (appState !== 'active') {
        return;
      }
    
      // Run custom logic
    
      subscription.remove();
    });
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {











      sync()
    }
  };

  async function sync() {
    try {

      await getSQLiteData()
        .then(data => {
          const { users, destinations, tasks } = data;
          console.log("promise data", data)


          syncDataToFirestore(data);

        })
        .catch(error => {
          console.log("error")
        });






    } catch (error) {
      console.error(error);
    }
  }




  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
