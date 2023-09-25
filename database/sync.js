import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import "firebase/compat/firestore";
import firebase from "./firebase"





// Initialize Cloud Firestore and get a reference to the service



export async function syncDataToFirestore(data) {

    try {


        
         const dbfs = firebase.firestore();

        const collectionRefUsers = dbfs.collection('users');

        await collectionRefUsers.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });

        await Promise.all(
            data.users.map(async (item) => {
                await collectionRefUsers.add(item);
            })
        );
        const collectionRefDestinations = dbfs.collection('destinations');

        await collectionRefDestinations.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });

        await Promise.all(
            data.destinations.map(async (item) => {
                await collectionRefDestinations.add(item);
            })
        );
        const collectionRefTasks = dbfs.collection('tasks');

        await collectionRefTasks.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });

        await Promise.all(
            data.tasks.map(async (item) => {
                await collectionRefTasks.add(item);
            })
        );

        console.error(' syncing data:OK');

        await AsyncStorage.removeItem('syncedData');
    } catch (error) {
        console.error('Error syncing data:', error);
    }
};




export const getSQLiteData = async () => {
    try {
        const db = SQLite.openDatabase('mydb.db');

        const users = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM users',
                    [],
                    (_, { rows: { _array } }) => {
                        resolve(_array);
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            });
        });

        const destinations = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM destinations',
                    [],
                    (_, { rows: { _array } }) => {
                        resolve(_array);
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            });
        });

        const tasks = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM tasks ',
                    [],
                    (_, { rows: { _array } }) => {
                        resolve(_array);
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            });
        });

        const [usersData, destinationsData, tasksData] = await Promise.all([users, destinations, tasks]);

        return { users: usersData, destinations: destinationsData, tasks: tasksData };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};









