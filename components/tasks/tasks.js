import { View, Text, StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react'
import { updateTask } from '../../database/Sqlite';

export default function Task(props) {
  const { data } = props

  const [isChecked, setChecked] = useState(false);
  const handleCheck = () => {

    updateTask(data?.taskId, 1)

    setChecked(true)
  }
  return (
<View style={[styles.taskCard, {backgroundColor: data.isCompleted ? '#bbefea' : '#ffff'}]}>

      <View style={styles.checkboxContainer}>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{data?.taskName}</Text>
        <Text style={styles.description}>{data?.description}</Text>
        <Text style={styles.dateTime}>
          Date: {data?.date}, Time: {data?.time}
        </Text>
      </View>
      {!data.isCompleted?<Checkbox style={styles.checkbox} value={isChecked} onValueChange={() => handleCheck()} />:<View style={styles.bookmark}><Text style={styles.bookmarktext}>Done</Text></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius:8,
    padding: 10,
    marginBottom:14,
    position:'relative'
    // backgroundColor:"#ffff"
  },
  bookmark: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 20,
    borderRadius:2,
    backgroundColor: "#40ad79", /* Bookmark color */
    transform: [{ rotate: '0deg' }],
    alignItems:'center'
  },
  bookmarktext:{
    color:"#ffff"
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