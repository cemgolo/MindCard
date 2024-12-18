import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { State } from "ts-fsrs";
import { cardStateColors } from "../storage/helper";
import { useState } from "react";
import CardStatesPieChart from "./CardStatesPieChart";

const ReviewSessionCardStateBar = ({ sessionCards }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <TouchableOpacity style={styles.container} onPress={() => setIsExpanded(!isExpanded)}>
            {isExpanded
                ? <CardStatesPieChart cards={sessionCards} title="" height={140} />
                : <UnexpandedStateBarContent sessionCards={sessionCards} />
            }
            <Text style={styles.expandIcon}>{isExpanded ? '↑' : '↓'}</Text>
        </TouchableOpacity>
    )
};

const UnexpandedStateBarContent = ({ sessionCards }) => {
    const stateCounts = [State.New, State.Learning, State.Review, State.Relearning]
        .reduce((obj, state) => ({ ...obj, [state]: sessionCards[state]?.length ?? 0 }), {});

    return (
        <View style={styles.flexRow}>
            {Object.entries(stateCounts).map(([state, cardCount]) =>
                <View key={state} style={[styles.flexRow, styles.cardStateInfo]}>
                    <View style={[styles.color, {backgroundColor: cardStateColors[state]}]} />
                    <Text>{cardCount}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    container: {
        gap: 10,
        backgroundColor: '#e5e5e5',
        padding: 10
    },
    cardStateInfo: {
        gap: 5,
        marginRight: 20
    },
    color: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginRight: 3
    },
    expandIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        color: 'gray'
    }
});

export default ReviewSessionCardStateBar;
