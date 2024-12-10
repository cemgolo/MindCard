import { View, Text, StyleSheet } from "react-native";
import { State } from "ts-fsrs";
import { cardStateColors } from "../storage/helper";

const ReviewSessionCardStateBar = ({ sessionCards }) => {
    return (
        <View style={[styles.flexRow, styles.container]}>
            {Object.entries(sessionCards).map(([state, cards]) => (
                <View key={state} style={styles.flexRow}>
                    <View style={[styles.color, {backgroundColor: cardStateColors[state]}]} />
                    <Text>{State[state]}: {cards.length}</Text>
                </View>
            ))}
        </View>
    )
};

const styles = StyleSheet.create({
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        gap: 20,
        backgroundColor: '#e5e5e5',
        padding: 10
    },
    color: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginRight: 10
    }
});

export default ReviewSessionCardStateBar;
