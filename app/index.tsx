import React, { useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox'; // Use expo-checkbox if you're using Expo

export default function App() {
  const [todos, setTodos] = useState([
    { id: '1', text: '   Buy groceries', checked: false },
    { id: '2', text: '   Walk the dog', checked: false },
    { id: '3', text: '   Finish project', checked: false },
  ]);
  const [newTodo, setNewTodo] = useState(''); // State for new item input

  // Function to toggle the checkbox
  const toggleCheck = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  // Function to mark all items as checked or unchecked
  const massCheck = (checkValue) => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      checked: checkValue,
    }));
    setTodos(updatedTodos);
  };

  // Function to add a new item to the list
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: newTodo, checked: false }]);
      setNewTodo('   '); // Clear input field after adding
    }
  };

  // Render each item in the list
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Checkbox
        value={item.checked}
        onValueChange={() => toggleCheck(item.id)}
      />
      <Text style={item.checked ? styles.checked : styles.unchecked}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="List To Do item"
        />
        <Button title="Add To do item" onPress={addTodo} />
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View style={styles.buttonContainer}>
          <Button title="Check All items" onPress={() => massCheck(true)} />
          <Button title="Uncheck All items" onPress={() => massCheck(false)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400, // Maximum width for the container
    backgroundColor: '#fff', // Background color of the container
    borderRadius: 10, // Rounded corners for the container
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 5, // Shadow blur radius for iOS
    elevation: 5, // Elevation for Android
    padding: 20,
  },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10,
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 5, 
    marginBottom: 10, 
    backgroundColor: '#f9f9f9', 
  },
  checked: { 
    textDecorationLine: 'line-through', 
    color: 'gray' 
  },
  unchecked: { 
    textDecorationLine: 'none' 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
