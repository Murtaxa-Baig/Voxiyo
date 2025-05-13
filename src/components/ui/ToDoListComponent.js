import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {Swipeable} from 'react-native-gesture-handler';
import Xmls from '../../utils/Xmls';

export default function ToDoListComponent() {
  const [todo, setTodo] = useState([{id: 1, name: 'Task 1'}]);
  const [completed, setCompleted] = useState([{id: 1, name: 'Task 1'}]);
  const [inputText, setInputText] = useState('');

  const handleAddTodo = () => {
    if (inputText.trim() === '') return;
    const newItem = {id: Date.now(), name: inputText.trim()};
    setTodo(prev => [...prev, newItem]);
    setInputText('');
  };

  const handleMarkComplete = item => {
    setTodo(prev => prev.filter(t => t.id !== item.id));
    setCompleted(prev => [...prev, item]);
  };

  const handleDelete = itemId => {
    setTodo(prev => prev.filter(t => t.id !== itemId));
  };

  const renderRightActions = itemId => (
    <TouchableOpacity
      onPress={() => handleDelete(itemId)}
      style={{
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        // width: 100,
        height: '100%',
      }}>
      <SvgXml xml={Xmls.deleteWhiteIcon} style={{marginHorizontal: 6}} />
      <Text style={{color: '#fff'}}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{padding: 16}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={handleAddTodo}
          style={{
            borderWidth: 1,
            borderColor: '#E2E5E9',
            height: 24,
            width: 24,
            borderRadius: 8,
            marginRight: 4,
          }}
        />
        <TextInput
          placeholder="Add new one"
          placeholderTextColor="#999"
          style={{color: '#000', flex: 1}}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAddTodo}
        />
      </View>

      <View style={{borderWidth: 1, borderColor: '#E2E5E9', marginTop: 12}} />

      {todo.map(item => (
        <Swipeable
          key={item.id}
          renderRightActions={() => renderRightActions(item.id)}>
          <TouchableOpacity
            onPress={() => handleMarkComplete(item)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 12,
              padding: 10,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E2E5E9',
                height: 24,
                width: 24,
                borderRadius: 8,
                marginRight: 4,
              }}
            />
            <Text style={{color: '#000'}}>{item.name}</Text>
          </TouchableOpacity>
        </Swipeable>
      ))}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        <Text style={{color: '#7C7F83', fontSize: 12}}>Completed</Text>
        <SvgXml xml={Xmls.dropDownCompeleteIcon} />
      </View>

      <ScrollView style={{height: '60%'}} keyboardShouldPersistTaps="handled">
        {completed.map(item => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                height: 24,
                width: 24,
                borderRadius: 8,
                marginRight: 4,
              }}>
              <SvgXml xml={Xmls.whiteTickIcon} />
            </View>
            <Text
              style={{
                color: '#000',
                textDecorationLine: 'line-through',
              }}>
              {item.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
