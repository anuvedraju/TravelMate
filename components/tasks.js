import { View, Text,StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react'
import { updateTask } from '../database/Sqlite';

export default function Task(props) {
 const{data}=props

 const [isChecked, setChecked] = useState(data.isCompleted);
const handleCheck=()=>{

 updateTask(data?.taskId,1)

setChecked(true)
}
  return (
    <View style={styles.taskCard}>
      <View style={styles.checkboxContainer}>
    </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{data?.taskName}</Text>
        <Text style={styles.description}>{data?.description}</Text>
        <Text style={styles.dateTime}>
          Date: {data?.date}, Time: {data?.time}
        </Text>
      </View>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={()=>handleCheck()} />
    </View>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  dateTime: {
    fontSize: 14,
    color: '#666',
  },
});