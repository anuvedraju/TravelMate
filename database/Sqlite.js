import * as SQLite from 'expo-sqlite';
import { useSelector } from 'react-redux';

const db = SQLite.openDatabase('mydb.db');

export function createUsers(){

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (userId TEXT PRIMARY KEY,name TEXT,email TEXT)',
      // `DROP TABLE IF EXISTS users`,
      [],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('Table created successfully');
        } else {
          console.log('Table already exists');
        }
      },
      (_, error) => {
        if (error) {
          console.error('Error creating users table:', error);
        } else {
          console.log('Users table created successfully');
        }
      }
    );
})}
export function InsertUser(user){

  db.transaction(tx => {
  tx.executeSql(
    'INSERT INTO users (userId,name, email) VALUES (?, ?, ?)',
    [user.email, user.displayName, user.email],
    (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('data inserted successfully');
        } else {
          console.log('data already exists');
        }
      },
    (_, { insertId }, error) => {
      if (error) {
        console.error('Error inserting user:', error);
      } else {
        console.log(`User inserted with ID: ${insertId}`);
      }
    }
  );
  })





}
export function CreateDestinations(){
  db.transaction(tx => {

  
      tx.executeSql(
          'CREATE TABLE IF NOT EXISTS destinations (destinationId INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,destinationName TEXT,startDate TEXT,endDate TEXT,userId TEXT,FOREIGN KEY (userId) REFERENCES users(userId))',
          // `DROP TABLE IF EXISTS destinations`,
          [],
          (_, result) => {
              if (result.rowsAffected > 0) {
                console.log('Table created successfully');
              } else {
                console.log('Table already exists');
              }
            },
          (_, error) => {
            if (error) {
              console.error('Error creating destinations table:', error);
            } else {
              console.log('Destinations table created successfully');
            }
          }
        );
  
    });
  }
  export function InsertDestinations(destinationData,user){


    db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO destinations (name, destinationName, startDate, endDate, userId) VALUES (?, ?, ?, ?, ?)',
      [
  
        
        destinationData.name,
        destinationData.destinationName,
        destinationData.startDate,
        destinationData.endDate,
        user.email, // Assuming userId 1234 exists
      ],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('data inserted successfully');
        } else {
          console.log('data already exists');
        }
      },
    (_, { insertId }, error) => {
      if (error) {
        console.error('Error inserting user:', error);
      } else {
        console.log(`User inserted with ID: ${insertId}`);
      }
    }
    );})
  }

// const fetchDestinationsByUserId = (userId) => {
//   return new Promise((resolve, reject) => {
//     const db = SQLite.openDatabase('mydb.db');

//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM destinations WHERE userId = ?',
//         [userId],
//         (_, { rows: { _array } }) => {
//           resolve(_array); // Resolve with _array when the query is successful
//         },
//         (_, error) => {
//           reject(error); // Reject with the error if there's a problem
//         }
//       );
//     });
//   });
// };
export function getDestinations(userId){
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('mydb.db');

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM destinations WHERE userId = ?',
        [userId],
        (_, { rows: { _array } }) => {
          resolve(_array); // Resolve with _array when the query is successful
        },
        (_, error) => {
          reject(error); // Reject with the error if there's a problem
        }
      );
    });
  });
};

  

export function CreateTasks(){
db.transaction(tx=>{

  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS tasks (taskId INTEGER PRIMARY KEY AUTOINCREMENT,taskName TEXT,date TEXT,time TEXT,isCompleted INTEGER,description TEXT,destinationId INTEGER,FOREIGN KEY (destinationId) REFERENCES destinations(destinationId))',
    // `DROP TABLE IF EXISTS tasks`,
    [],
    (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('Table created successfully');
        } else {
          console.log('Table already exists');
        }
      },
    (_, error) => {
      if (error) {
        console.error('Error creating tasks table:', error);
      } else {
        console.log('Itineraries table created successfully');
      }
    }
  );

})
}
export function InsertTasks(taskData,destinationId){


    db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO tasks (taskName, date, time,isCompleted, description, destinationId) VALUES (?, ?, ?,?, ?, ?)',
      [
  
        
        taskData.taskName,
        taskData.date,
        taskData.time,
        taskData.isCompleted,
        taskData.description,
        destinationId, // Assuming userId 1234 exists
      ],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('data inserted to task table successfully');
        } else {
          console.log('data already exists');
        }
      },
    (_, { insertId }, error) => {
      if (error) {
        console.error('Error inserting user:', error);
      } else {
        console.log(`User inserted with ID: ${insertId}`);
      }
    }
    );})
  }

  export function getTasks(destinationId){
    return new Promise((resolve, reject) => {
      const db = SQLite.openDatabase('mydb.db');
  
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM tasks WHERE destinationId = ?',
          [destinationId],
          (_, { rows: { _array } }) => {
            resolve(_array); // Resolve with _array when the query is successful
          },
          (_, error) => {
            reject(error); // Reject with the error if there's a problem
          }
        );
      });
    });
  };

export function updateTask(taskId, isCompleted){
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE tasks SET isCompleted = ? WHERE taskId = ?',
      [isCompleted, taskId],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('Task updated successfully');
        } else {
          console.log('No task found with the specified ID');
        }
      },
      (_, error) => {
        console.error('Error updating task:', error);
      }
    );
  });
};

// Example usage: Update task with taskId 1 to be completed (1)

export function dropTables(){
    db.transaction(tx => {
        tx.executeSql(
          `
          BEGIN TRANSACTION;
          DROP TABLE IF EXISTS users;
          DROP TABLE IF EXISTS destinations;
          DROP TABLE IF EXISTS tasks;
          COMMIT;
          `,
          [],
          (_, result) => {
            console.log('Tables dropped successfully');
          },
          (_, error) => {
            console.error('Error dropping tables:', error);
          }
        );
      });
}
  

// export function InsertUser(){

// }