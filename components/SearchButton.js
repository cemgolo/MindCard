import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchButton = ({ setSearchText }) => {
  const [isSearching, setIsSearching] = useState(false); // State for search input visibility
  const [searchInput, setSearchInput] = useState(''); // State for search text

  const toggleSearch = () => {
    setIsSearching(!isSearching); // Toggle search bar visibility
  };

  const handleSearchChange = (text) => {
    setSearchInput(text); // Update search input state
    setSearchText(text); // Pass the search text to parent
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleSearch}>
        <Icon name="search" size={26} color="#333" style={styles.icon} />
      </TouchableOpacity>

      {/* Conditionally render the search bar */}
      {isSearching && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchInput}
            onChangeText={handleSearchChange}
            placeholder="Search cards..."
            autoFocus
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 16,
  },
  searchContainer: {
    padding: 5,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  searchInput: {
    padding: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default SearchButton;
