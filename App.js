import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import moment from 'moment';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [dueDate, setDueDate] = useState('');

  const [section, setSection] = useState('all');
  const [theme, setTheme] = useState('classic');
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = () => {
    if (task.trim() === '') return;

    setTasks([...tasks, { id: Date.now().toString(), text: task, dueDate: dueDate, completed: false }]);
    setTask('');
    setDueDate('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskItem, item.completed && styles.completedTask, theme === 'modern' && styles.modernTaskItem]}
      onPress={() => toggleCompleted(item.id)}
      onLongPress={() => deleteTask(item.id)}
    >
      <View style={styles.taskInfo}>
        <Text style={styles.taskText}>{item.text}</Text>
        {item.dueDate && <Text style={styles.dueDate}>Due: {moment(item.dueDate).format('MMM D, YYYY')}</Text>}
      </View>
      {item.completed && <MaterialIcons name="check-circle" size={24} color="#4CAF50" />}
    </TouchableOpacity>
  );

  const filteredTasks = () => {
    let filtered = tasks;
  
    if (section !== 'all') {
      filtered = filtered.filter(task => (section === 'completed' ? task.completed : !task.completed));
    }
  
    if (searchTerm) {
      filtered = filtered.filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  
    return filtered;
  };
  

  const containerStyle = [
    styles.container,
    theme === 'modern' && styles.modernContainer,
  ];

  return (
    <View style={containerStyle}>
      <Text style={styles.heading}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={task}
          onChangeText={text => setTask(text)}
        />
        
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
      <TextInput
  style={styles.searchInput}
  placeholder="Search tasks"
  value={searchTerm}
  onChangeText={text => setSearchTerm(text)}
/>

        <MaterialIcons name="search" size={24} color="#757575" />
      </View>
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={[styles.sectionButton, section === 'all' && styles.activeSection]}
          onPress={() => setSection('all')}
        >
          <Text style={styles.sectionButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionButton, section === 'completed' && styles.activeSection]}
          onPress={() => setSection('completed')}
        >
          <Text style={styles.sectionButtonText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionButton, section === 'pending' && styles.activeSection]}
          onPress={() => setSection('pending')}
        >
          <Text style={styles.sectionButtonText}>Pending</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredTasks()}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        style={styles.taskList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000080',
    padding: 20,
  },
  modernContainer: {
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:20,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  sectionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeSection: {
    backgroundColor: '#0056b3',
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  completedTask: {
    backgroundColor: '#cfcfcf',
  },
  modernTaskItem: {
    backgroundColor: '#f9f9f9',
  },
  taskInfo: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  dueDate: {
    fontSize: 12,
    color: '#757575',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
});
