import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
    secondary: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginRight: 10,
        alignItems: 'center',
    },
    secondaryText: {
        color: '#333',
        fontSize: 16,
    },
    primary: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
    },
    primaryText: {
        color: '#fff',
        fontSize: 16,
  },
});

export default buttonStyles;
