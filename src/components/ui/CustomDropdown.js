import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';

export default function CustomDropdown({
  items,
  value,
  setValue,
  label,
  setError,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.inputFields}
        onPress={() => setOpen(!open)}>
        {value ? (
          <Image source={{uri: value.uri}} style={styles.flag} />
        ) : (
          <View style={styles.flagPlaceholder} />
        )}
        <Text style={styles.blackText}>
          {value ? value.label : 'Select country'}
        </Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
          <FlatList
            data={filteredItems}
            keyExtractor={item => item.value}
            style={styles.list}
            nestedScrollEnabled
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  setValue(item);
                  setOpen(false);
                  setSearch('');
                  setError('');
                }}>
                <Image source={{uri: item.uri}} style={styles.flag} />
                <Text style={styles.blackText}>{item.label}</Text>
                {value?.value === item.value && (
                  <Text style={styles.check}>✓</Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    color: 'black',
    marginBottom: 4,
  },
  inputFields: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  flag: {
    width: 21,
    height: 15,
    marginRight: 8,
    borderRadius: 3,
  },
  flagPlaceholder: {
    width: 21,
    height: 15,
    marginRight: 8,
    backgroundColor: '#E2E5E9',
    borderRadius: 3,
  },
  dropdownBox: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 250,
  },
  searchInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    color: 'black',
  },
  list: {
    paddingHorizontal: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  blackText: {
    color: 'black',
    flex: 1,
  },
  check: {
    fontWeight: 'bold',
    color: 'green',
  },
});
