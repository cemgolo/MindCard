import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
    primary: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
    },
    primaryText: {
        color: '#fff',
        fontSize: 16,
    },
    secondary: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginRight: 10,
        alignItems: 'center',
    },
    secondaryText: {
        color: '#333',
        fontSize: 16,
    }
});

export default buttonStyles;
