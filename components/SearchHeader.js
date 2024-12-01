import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchHeader = ({children, style, outerStyle, searchText, setSearchText, placehold}) => {
  const [isSearching, setIsSearching] = useState(false);

  const toggleSearch = () => {
    if(isSearching) setSearchText('');
    setIsSearching(!isSearching); // Toggle search mode
  };

  const handleSearchChange = (text) => {
    setSearchText(text); // Update search input state
  };

  return (
    <View style={[outerStyle, styles.header]}>
      
      {isSearching ? (
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleSearchChange}
            placeholder= {placehold}
            autoFocus
          />
          <TouchableOpacity onPress={toggleSearch}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.headerContent}>
            <View style={[style]}>
              {children}
            </View>
            <TouchableOpacity onPress={toggleSearch}>
              <Icon name="search" size={26} color="#333" style={styles.icon} />
            </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%"
  },
  headerContent: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deckName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  deckNameInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchHeader;
