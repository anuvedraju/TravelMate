import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import AddTasks from "./addTasks";
import { CreateTasks, getTasks } from "../../database/Sqlite";
import Task from "./tasks";

export default function Activities() {
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const currentDestination = useSelector(
    (state) => state.some?.currentDestination
  );
  const [myTasks, setMyTasks] = useState([]);

  useSelector((state) => state.some?.currentDestination);

  useEffect(() => {
    if (currentDestination) {
      getTasks(currentDestination.destinationId)
        .then((tasks) => {
          console.log("Tasks:", currentDestination.destinationId);
          setMyTasks(tasks);
        })
        .catch((error) => {
          console.error("Error fetching destinations:", error);
        });
    }
  }, [currentDestination]);

  const handleAddActivity = () => {
    setAddTaskModalVisible(true);
    console.log("currentDestination", currentDestination);
  };
  return (
    <View style={styles.container}>
      {addTaskModalVisible ? (
        <AddTasks
          setAddTaskModalVisible={setAddTaskModalVisible}
          addTaskModalVisible={addTaskModalVisible}
          destinationId={currentDestination.destinationId}
          myTasks={myTasks}
          setMyTasks={setMyTasks}
        />
      ) : (
        <View />
      )}

      <Text style={styles.title}>{currentDestination?.name}</Text>
      <View style={styles.detailscontainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Trip Name:</Text>
          <Text style={styles.text}>{currentDestination?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Destination:</Text>
          <Text style={styles.text}>{currentDestination?.destinationName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.text}>{currentDestination?.startDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>End Date:</Text>
          <Text style={styles.text}>{currentDestination?.endDate}</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddActivity()}
          >
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.taskContainer}>
        <Text style={styles.subtitle}>Tasks</Text>
        {myTasks?.length !== 0 ? (
          <ScrollView>
            {myTasks?.map((item, index) => (
              <Task
                key={index}
                data={item}
                myTasks={myTasks}
                setMyTasks={setMyTasks}
                destinationId={currentDestination?.destinationId}
              />
            ))}
          </ScrollView>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: 'center',
    // marginTop: 10,
    alignItems: "center",
    // position:'relative'
  },
  taskContainer: {
    width: "95%",
    overflowY: "auto",
    marginTop: 4,
    marginBottom: 10,
    // maxHeight:"40%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#ffff",
    position: "absolute",
    bottom: 0,
    height: "60%",
  },
  detailscontainer: {
    padding: 10,
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "95%",
    height: "28%",
    backgroundColor: "#ffff",
    position: "absolute",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    flexShrink: 1,
    marginLeft: 10,
  },
  addButton: {
    marginTop: 2,
    padding: 2,
    borderRadius: 8,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#00c7eb",
    borderRadius: 8,
  },
  buttonText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    position: "absolute",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 10,
    // position:'absolute'
  },
});
