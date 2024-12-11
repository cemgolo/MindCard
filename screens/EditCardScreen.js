import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { ADD_CARD, DELETE_CARD, UPDATE_CARD } from '../storage/actions';
import uuid from 'react-native-uuid';

const EditCardScreen = ({ route }) => {
  const { deckName, card } = route.params;
  const navigation = useNavigation();

  const [frontImage, setFrontImage] = useState(card?.frontImage || null);
  const [backImage, setBackImage] = useState(card?.backImage || null);
  const [frontDescription, setFrontDescription] = useState(card?.frontDescription || '');
  const [backDescription, setBackDescription] = useState(card?.backDescription || '');
  const [isFrontTab, setIsFrontTab] = useState(true);

  const dispatch = useDispatch();

  const handleSave = () => {
    if (!frontDescription) {
      alert('Please provide at least a front description');
      return;
    }
  
    const updatedCard = {
      ...card,
      frontDescription,
      backDescription,
      frontImage,
      backImage
    };
  
    if (card?.uuid) {
      // Update the card
      dispatch({
        type: UPDATE_CARD,
        payload: { deckName, updatedCard },
      });
    } else {
      // Create a new card
      const newCard = {
        uuid: uuid.v4(),
        frontDescription,
        backDescription,
        frontImage,
        backImage
      };
  
      dispatch({
        type: ADD_CARD,
        payload: { deckName, card: newCard },
      });
    }
  
    navigation.goBack();
  };
  
  const confirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this card?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDelete },
      ]
    );
  };

  const handleDelete = () => {
    dispatch({
        type: DELETE_CARD,
        payload: { deckName, cardId: card.uuid },
    });
    navigation.goBack();
  };

  const handleEditImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      isFrontTab ? setFrontImage(result.assets[0].uri) : setBackImage(result.assets[0].uri);
    }
  };
  
  const handleDeleteImage = () => {
    isFrontTab ? setFrontImage(null) : setBackImage(null);
  };

  return (
    <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>{deckName}</Text>
      </View>
    </View>

    {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, isFrontTab && styles.activeTab]}
          onPress={() => setIsFrontTab(true)}
        >
          <Text style={[styles.tabText, isFrontTab && styles.activeTabText]}>Front</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, !isFrontTab && styles.activeTab]}
          onPress={() => setIsFrontTab(false)}
        >
          <Text style={[styles.tabText, !isFrontTab && styles.activeTabText]}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Card Content */}
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          {isFrontTab ? (
            frontImage ? (
            <Image source={{ uri: frontImage }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Add Image</Text>
            </View>
          )
        ) : (
          backImage ? (
            <Image source={{ uri: backImage }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Add Image</Text>
            </View>
          )
        )
        }
          <TouchableOpacity style={styles.iconButton} onPress={handleEditImage}>
            <Icon name="edit" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteIconButton} onPress={handleDeleteImage}>
            <Icon name="delete" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Description"
          value={isFrontTab ? frontDescription : backDescription}
          onChangeText={(text) =>
            isFrontTab ? setFrontDescription(text) : setBackDescription(text)
          }
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  activeTab: {
    backgroundColor: '#fff',
    borderBottomColor: '#f5f5f5',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  cardContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#888',
  },
  iconButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 5,
  },
  deleteIconButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#ff4444',
    borderRadius: 20,
    padding: 5,
  },
  descriptionInput: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditCardScreen;
