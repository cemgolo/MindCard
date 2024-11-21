import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
  },
  createButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default globalStyles;
